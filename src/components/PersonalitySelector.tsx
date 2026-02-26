import { Personality, personalityConfig } from '@/lib/emotions';
import MaterialIcon from './MaterialIcon';

interface PersonalitySelectorProps {
  personality: Personality;
  onPersonalityChange: (p: Personality) => void;
}

const PersonalitySelector = ({ personality, onPersonalityChange }: PersonalitySelectorProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {(Object.keys(personalityConfig) as Personality[]).map((p) => {
        const config = personalityConfig[p];
        const isActive = personality === p;
        return (
          <button
            key={p}
            onClick={() => onPersonalityChange(p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
              isActive
                ? 'bg-primary/20 border border-primary/30 text-foreground glow-primary'
                : 'glass text-muted-foreground hover:text-foreground hover:border-primary/20'
            }`}
          >
            <MaterialIcon name={config.icon} size={16} className={isActive ? 'text-primary animate-icon-pop' : ''} />
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PersonalitySelector;
