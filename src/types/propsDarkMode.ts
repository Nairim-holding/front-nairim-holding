export default interface PropsDarkMode {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

export type PropsDarkModeValue = Pick<PropsDarkMode, 'darkMode'>;