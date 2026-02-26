import { Message } from '@/lib/emotions';
import EmotionBadge from './EmotionBadge';
import MaterialIcon from './MaterialIcon';

interface ChatMessageProps {
  message: Message;
  showAvatar?: boolean;
  showTimestamp?: boolean;
}

const ChatMessage = ({ message, showAvatar = true, showTimestamp = true }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`max-w-[85%] md:max-w-[70%] flex flex-col gap-0.5`}>
        {!isUser && showAvatar && message.isGroupStart && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-primary/20 icon-avatar">
              <MaterialIcon name="favorite" size={16} className="text-primary" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">ApnaDost</span>
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'bg-[hsl(var(--user-bubble))] text-[hsl(var(--user-bubble-foreground))] rounded-tr-md shadow-md'
              : 'bg-[hsl(var(--bot-bubble))] text-[hsl(var(--bot-bubble-foreground))] rounded-tl-md border border-border/20'
          }`}
        >
          {message.content}
        </div>
        {showTimestamp && (
          <div className="flex items-center gap-2 px-1">
            <span className="text-[10px] text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {isUser && message.emotion && <EmotionBadge emotion={message.emotion} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
