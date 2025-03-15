
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
  sender_name?: string;
  receiver_name?: string;
}

interface MessageListProps {
  otherUserId: string;
  currentUserId: string;
}

export const MessageList = ({ otherUserId, currentUserId }: MessageListProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            sender:sender_id(name, avatar_url),
            receiver:receiver_id(name, avatar_url)
          `)
          .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
          .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Transform data to include sender and receiver names
        const formattedMessages = data.map((msg: any) => ({
          ...msg,
          sender_name: msg.sender?.name || 'Usuário desconhecido',
          receiver_name: msg.receiver?.name || 'Usuário desconhecido',
        }));

        setMessages(formattedMessages);

        // Mark messages as read
        const unreadMessages = formattedMessages
          .filter(msg => msg.receiver_id === currentUserId && !msg.read)
          .map(msg => msg.id);

        if (unreadMessages.length > 0) {
          await supabase
            .from('messages')
            .update({ read: true })
            .in('id', unreadMessages);
        }
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // Set up realtime subscription
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${otherUserId},receiver_id=eq.${currentUserId}`
        },
        async (payload) => {
          // Fetch the new message with user details
          const { data, error } = await supabase
            .from('messages')
            .select(`
              *,
              sender:sender_id(name, avatar_url),
              receiver:receiver_id(name, avatar_url)
            `)
            .eq('id', payload.new.id)
            .single();

          if (!error && data) {
            const newMessage = {
              ...data,
              sender_name: data.sender?.name || 'Usuário desconhecido',
              receiver_name: data.receiver?.name || 'Usuário desconhecido',
            };
            
            setMessages(prev => [...prev, newMessage]);
            
            // Mark as read
            await supabase
              .from('messages')
              .update({ read: true })
              .eq('id', payload.new.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, otherUserId]);

  if (isLoading) {
    return <div className="flex justify-center p-4">Carregando mensagens...</div>;
  }

  // Filter messages to only show those between the two users
  const filteredMessages = messages.filter(
    msg => (msg.sender_id === currentUserId && msg.receiver_id === otherUserId) || 
           (msg.sender_id === otherUserId && msg.receiver_id === currentUserId)
  );

  return (
    <div className="flex flex-col space-y-4 p-4">
      {filteredMessages.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          Nenhuma mensagem encontrada. Comece uma conversa!
        </div>
      ) : (
        filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.sender_id === currentUserId ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={
                message.sender_id === currentUserId 
                  ? message.receiver?.avatar_url 
                  : message.sender?.avatar_url
              } />
              <AvatarFallback>
                {message.sender_id === currentUserId 
                  ? message.receiver_name?.charAt(0) 
                  : message.sender_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div 
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender_id === currentUserId 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender_id === currentUserId 
                  ? 'text-primary-foreground/70' 
                  : 'text-gray-500'
              }`}>
                {format(new Date(message.created_at), 'HH:mm')}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
