import MaterialIcon from './MaterialIcon';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => (
  <button
    onClick={onToggle}
    className="p-2 rounded-xl glass text-muted-foreground hover:text-foreground transition-all duration-300"
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    <MaterialIcon
      name={isDark ? 'dark_mode' : 'light_mode'}
      size={18}
      className="animate-icon-pop"
    />
  </button>
);

export default ThemeToggle;
