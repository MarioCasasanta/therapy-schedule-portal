
import { useState } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ConversationList } from "./ConversationList";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface MessagingContainerProps {
  currentUserId: string;
  initialSelectedUserId?: string;
}

export const MessagingContainer = ({ 
  currentUserId,
  initialSelectedUserId
}: MessagingContainerProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(initialSelectedUserId);
  const [isMobileConversationVisible, setIsMobileConversationVisible] = useState(!!initialSelectedUserId);

  const handleSelectConversation = (userId: string) => {
    setSelectedUserId(userId);
    setIsMobileConversationVisible(true);
  };

  const handleBackToList = () => {
    setIsMobileConversationVisible(false);
  };

  return (
    <Card className="h-[600px] flex overflow-hidden">
      {/* Conversations list (hidden on mobile when a conversation is selected) */}
      <div className={`w-full md:w-1/3 border-r ${isMobileConversationVisible ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Mensagens</h2>
        </div>
        <div className="overflow-y-auto h-[calc(600px-57px)]">
          <ConversationList 
            currentUserId={currentUserId} 
            onSelectConversation={handleSelectConversation}
            selectedUserId={selectedUserId}
          />
        </div>
      </div>
      
      {/* Message area (shown on mobile only when a conversation is selected) */}
      <div className={`w-full md:w-2/3 flex flex-col ${isMobileConversationVisible ? 'block' : 'hidden md:flex'}`}>
        {selectedUserId ? (
          <>
            <div className="p-4 border-b flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden mr-2" 
                onClick={handleBackToList}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="font-semibold text-lg">Conversa</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <MessageList 
                currentUserId={currentUserId} 
                otherUserId={selectedUserId} 
              />
            </div>
            <MessageInput 
              senderId={currentUserId} 
              receiverId={selectedUserId} 
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Selecione uma conversa para começar
          </div>
        )}
      </div>
    </Card>
  );
};
