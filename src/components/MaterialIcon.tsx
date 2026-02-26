interface MaterialIconProps {
  name: string;
  size?: number;
  className?: string;
}

const MaterialIcon = ({ name, size = 20, className = '' }: MaterialIconProps) => (
  <span
    className={`material-symbols-outlined select-none ${className}`}
    style={{ fontSize: size, lineHeight: 1 }}
  >
    {name}
  </span>
);

export default MaterialIcon;
