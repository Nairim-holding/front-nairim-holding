import PropsDarkMode from "@/types/propsDarkMode";

export interface PropsButtonToggle extends PropsDarkMode {
  openAside: boolean;
  handleMouseLeave: () => void;
}