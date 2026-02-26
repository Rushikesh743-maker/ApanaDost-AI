import { Emotion, emotionConfig } from '@/lib/emotions';
import MaterialIcon from './MaterialIcon';

interface MoodTrackerProps {
  moods: { emotion: Emotion; timestamp: Date }[];
}

const MoodTracker = ({ moods }: MoodTrackerProps) => {
  if (moods.length === 0) return null;

  const recent = moods.slice(-7);

  return (
    <div className="glass rounded-xl p-3">
      <h3 className="text-xs font-semibold text-muted-foreground mb-2 font-display">Today's Mood Journey</h3>
      <div className="flex items-center gap-1">
        {recent.map((m, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <MaterialIcon
              name={emotionConfig[m.emotion].icon}
              size={22}
              className={`${emotionConfig[m.emotion].color} animate-float`}
            />
            <span className="text-[9px] text-muted-foreground">
              {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
