import { Emotion, emotionConfig } from '@/lib/emotions';
import MaterialIcon from './MaterialIcon';

interface EmotionBadgeProps {
  emotion: Emotion;
}

const EmotionBadge = ({ emotion }: EmotionBadgeProps) => {
  if (emotion === 'neutral') return null;
  const config = emotionConfig[emotion];

  return (
    <div className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs animate-slide-up">
      <MaterialIcon name={config.icon} size={14} className={`${config.color} animate-icon-pop`} />
      <span className={config.color}>{config.label}</span>
    </div>
  );
};

export default EmotionBadge;
