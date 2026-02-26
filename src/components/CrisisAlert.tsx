import MaterialIcon from './MaterialIcon';

const CrisisAlert = () => (
  <div className="rounded-xl border border-accent/30 bg-accent/10 p-4 animate-slide-up">
    <div className="flex items-center gap-2 mb-2">
      <MaterialIcon name="call" size={18} className="text-accent" />
      <span className="text-sm font-semibold text-accent">You're Not Alone</span>
    </div>
    <p className="text-xs text-foreground/80 leading-relaxed mb-2">
      If you're going through something really difficult, please reach out to someone who can help:
    </p>
    <ul className="text-xs text-foreground/70 space-y-1">
      <li>iCall: <strong>9152987821</strong></li>
      <li>Vandrevala Foundation: <strong>1860-2662-345</strong></li>
      <li>Crisis Text Line: Text <strong>HELLO</strong> to <strong>741741</strong></li>
    </ul>
  </div>
);

export default CrisisAlert;
