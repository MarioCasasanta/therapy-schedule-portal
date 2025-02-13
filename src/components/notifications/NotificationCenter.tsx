import { useState, useEffect } from 'react';
import { Bell, Brain, Heart, Target, Calendar, CreditCard, CheckCircle, AlertCircle, Gift, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  created_at: string;
  read: boolean;
  metadata?: Record<string, any>;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'session_reminder':
      return Calendar;
    case 'payment_due':
      return CreditCard;
    case 'welcome_message':
      return Heart;
    case 'feedback_request':
      return CheckCircle;
    case 'appointment_confirmation':
      return Clock;
    case 'appointment_cancellation':
      return AlertCircle;
    case 'birthday_greeting':
      return Gift;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'session_reminder':
      return 'text-blue-600';
    case 'payment_due':
      return 'text-red-600';
    case 'welcome_message':
      return 'text-green-600';
    case 'feedback_request':
      return 'text-purple-600';
    case 'appointment_confirmation':
      return 'text-teal-600';
    case 'appointment_cancellation':
      return 'text-orange-600';
    case 'birthday_greeting':
      return 'text-pink-600';
    default:
      return 'text-gray-600';
  }
};

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        (payload) => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro ao carregar notificações',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setNotifications(data || []);
      setUnreadCount(data?.filter((n) => !n.read).length || 0);
    }
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao marcar como lida',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount(unreadCount - 1);
    }
  };

  const markAllAsRead = async () => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('read', false);

    if (error) {
      toast({
        title: 'Erro ao marcar todas como lidas',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setNotifications(
        notifications.map((n) => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-semibold">Notificações</h2>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              className="text-xs"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Nenhuma notificação
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-4 ${notification.read ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors cursor-pointer`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-5 w-5 ${colorClass} mt-1`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`text-sm font-medium ${colorClass}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {format(new Date(notification.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
