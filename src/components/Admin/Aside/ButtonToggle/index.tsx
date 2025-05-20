import PropsDarkMode from "@/types/propsDarkMode";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

interface PropsButtonToggle extends PropsDarkMode {
  openAside: boolean;
}

export default function ButtonToggle({
  darkMode,
  setDarkMode,
  openAside,
}: PropsButtonToggle) {
  return (
    <div className="mt-10 w-full flex justify-center items-center gap-5">
      {openAside && (
        darkMode 
        ?
        <div className="w-[20px] h-[20px] flex items-center justify-center">
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.57576 1.74545C10.4936 1.74545 14.497 4.87855 14.497 8.72727C14.497 12.576 10.4936 15.7091 5.57576 15.7091C5.19661 15.7091 4.81745 15.6916 4.44945 15.648C6.57939 13.7629 7.80606 11.3018 7.80606 8.72727C7.80606 6.15273 6.57939 3.69164 4.44945 1.80655C4.81745 1.76291 5.19661 1.74545 5.57576 1.74545ZM5.57576 0C3.54618 0 1.63927 0.436364 0 1.17818C3.3343 2.688 5.57576 5.49818 5.57576 8.72727C5.57576 11.9564 3.3343 14.7665 0 16.2764C1.63927 17.0182 3.54618 17.4545 5.57576 17.4545C11.7314 17.4545 16.7273 13.5447 16.7273 8.72727C16.7273 3.90982 11.7314 0 5.57576 0Z" fill="#fff"/>
            </svg>
        </div>
        :
        <div className="w-[20px] h-[20px] flex items-center justify-center">
            <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 12H21M3 12H4M12 20V21M12 3V4M17.657 17.657L18.364 18.364M5.636 5.636L6.343 6.343M6.343 17.657L5.636 18.364M18.364 5.636L17.657 6.343"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M12.0001 17.3334C14.9456 17.3334 17.3334 14.9455 17.3334 12C17.3334 9.0545 14.9456 6.66669 12.0001 6.66669C9.05456 6.66669 6.66675 9.0545 6.66675 12C6.66675 14.9455 9.05456 17.3334 12.0001 17.3334Z"
                stroke="#000"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            </svg>
        </div>
      )}
      {openAside && <p className={`${darkMode ? 'text-white' : 'text-black ' }`}>{darkMode ? 'Dark Mode' : 'Light Mode' }</p>}
      <button
        className="bg-[#37373B] rounded-full w-[40px] p-1 outline-none min-w-[40px] max-w-[40px] relative h-[27px]"
        onClick={() => setDarkMode(!darkMode)}>
        <div className={`bg-[#fff] w-[19px] h-[19px] rounded-full flex justify-center items-center absolute top-[4px] duration-200 ease-linear ${darkMode ? 'left-[17px]' : 'left-[4px]'}`}>
          {darkMode ? <IoMoonOutline /> : <IoSunnyOutline color="#000" />}
        </div>
      </button>
    </div>
  );
}
