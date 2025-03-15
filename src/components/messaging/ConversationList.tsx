
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Conversation {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

interface ConversationListProps {
  currentUserId: string;
  onSelectConversation: (userId: string) => void;
  selectedUserId?: string;
}

export const ConversationList = ({ 
  currentUserId, 
  onSelectConversation,
  selectedUserId
}: ConversationListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // Get all messages where the current user is sender or receiver
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select(`
            id,
            content,
            created_at,
            read,
            sender_id,
            receiver_id,
            sender:profiles!sender_id(name, avatar_url),
            receiver:profiles!receiver_id(name, avatar_url)
          `)
          .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
          .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;

        // Process the data to create a list of unique conversations
        const conversationsMap = new Map<string, Conversation>();

        messagesData.forEach((message: any) => {
          const isCurrentUserSender = message.sender_id === currentUserId;
          const otherUserId = isCurrentUserSender ? message.receiver_id : message.sender_id;
          const otherUserData = isCurrentUserSender ? message.receiver : message.sender;
          
          if (!conversationsMap.has(otherUserId)) {
            conversationsMap.set(otherUserId, {
              id: otherUserId,
              user_id: otherUserId,
              user_name: otherUserData?.name || 'Usuário desconhecido',
              user_avatar: otherUserData?.avatar_url,
              last_message: message.content,
              last_message_time: message.created_at,
              unread_count: (!isCurrentUserSender && !message.read) ? 1 : 0
            });
          } else if (!isCurrentUserSender && !message.read) {
            // Increment unread count for existing conversation
            const existing = conversationsMap.get(otherUserId)!;
            existing.unread_count += 1;
          }
        });

        setConversations(Array.from(conversationsMap.values()));
      } catch (error) {
        console.error("Erro ao buscar conversas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();

    // Set up realtime subscription for new messages
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `receiver_id=eq.${currentUserId}`
        },
        () => {
          fetchConversations();
        }
      )
      .on(
        'postgres_changes',
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'messages',
          filter: `receiver_id=eq.${currentUserId}`
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);

  if (isLoading) {
    return <div className="p-4 text-center">Carregando conversas...</div>;
  }

  if (conversations.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Nenhuma conversa encontrada. Inicie uma mensagem com um especialista ou cliente.
      </div>
    );
  }

  return (
    <div className="divide-y">
      {conversations.map(conversation => (
        <div
          key={conversation.id}
          className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition ${
            selectedUserId === conversation.user_id ? 'bg-gray-100' : ''
          }`}
          onClick={() => onSelectConversation(conversation.user_id)}
        >
          <div className="relative">
            <Avatar>
              <AvatarImage src={conversation.user_avatar} />
              <AvatarFallback>{conversation.user_name.charAt(0)}</AvatarFallback>
            </Avatar>
            {conversation.unread_count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {conversation.unread_count}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="font-medium truncate">{conversation.user_name}</h3>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(conversation.last_message_time), { 
                  addSuffix: true,
                  locale: ptBR
                })}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate">{conversation.last_message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
