import PropsDarkMode from "@/types/propsDarkMode";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

interface PropsButtonToggle extends PropsDarkMode {
  openAside: boolean;
  openAsideDelay: boolean;
}

export default function ButtonToggle({
  darkMode,
  setDarkMode,
  openAside,
  openAsideDelay,
}: PropsButtonToggle) {
  return (
    <div className="flex items-center justify-center gap-5">
      {openAside && openAsideDelay && (
        <>
          <div className="transition-all duration-300">
            {darkMode ? (
              <IoMoonOutline color="#fff" />
            ) : (
              <IoSunnyOutline color="#000" />
            )}
          </div>

          <p
            className={`transition-all duration-300 ${
              darkMode ? "text-white" : "text-black"
            }`}>
            {darkMode ? "Dark Mode" : "Light Mode"}
          </p>
        </>
      )}

      <button
        className="bg-[#37373B] rounded-full w-[40px] p-1 outline-none min-w-[40px] max-w-[40px] relative h-[27px]"
        onClick={() => setDarkMode(!darkMode)}>
        <div
          className={`bg-[#fff] w-[19px] h-[19px] rounded-full flex justify-center items-center absolute top-[4px] duration-200 ease-linear ${
            darkMode ? "left-[17px]" : "left-[4px]"
          }`}>
          {darkMode ? <IoMoonOutline /> : <IoSunnyOutline color="#000" />}
        </div>
      </button>
    </div>
  );
}

