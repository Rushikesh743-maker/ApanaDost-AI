import MaterialIcon from './MaterialIcon';
import { X } from 'lucide-react';
import { useState } from 'react';

const SafetyBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="glass rounded-xl p-3 flex items-start gap-3 text-xs text-muted-foreground animate-fade-in">
      <MaterialIcon name="info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
      <p className="flex-1 leading-relaxed">
        ApnaDost is here to support you, but it is not a licensed mental health professional.
        If you're in crisis, please contact a helpline or trusted person.
      </p>
      <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground mt-0.5">
        <X size={14} />
      </button>
    </div>
  );
};

export default SafetyBanner;
