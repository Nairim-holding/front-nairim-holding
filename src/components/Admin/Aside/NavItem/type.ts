export interface NavItemProps {
  href: string;
  children: React.ReactNode;
  title: string;
  handleMouseLeave?: () => void;
}
