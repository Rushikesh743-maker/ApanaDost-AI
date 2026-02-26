import MaterialIcon from './MaterialIcon';

const TypingIndicator = () => (
  <div className="flex items-center gap-3 animate-slide-up">
    <div className="w-8 h-8 rounded-full bg-primary/20 icon-avatar">
      <MaterialIcon name="more_horiz" size={18} className="text-primary animate-pulse-soft" />
    </div>
    <div className="glass rounded-2xl rounded-tl-md px-4 py-3">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-primary typing-dot-1" />
        <div className="w-2 h-2 rounded-full bg-primary typing-dot-2" />
        <div className="w-2 h-2 rounded-full bg-primary typing-dot-3" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
