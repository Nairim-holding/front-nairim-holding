import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IncrementDecrementButtonsProps } from "./type";
import IconNumberArrowUp from "@/components/Icons/IconNumberArrowUp";
import IconNumberArrowDown from "@/components/Icons/IconNumberArrowDown";

export default function IncrementDecrementButtons({handleDecrement, handleIncrement}: IncrementDecrementButtonsProps) {
  return (
    <div className="absolute right-2 flex flex-col items-center py-2">
      <button
        type="button"
        onClick={handleIncrement}
        className="text-lg font-bold text-[#555] hover:text-black transition duration-150 ease-in-out">
        <IconNumberArrowUp size={18} color="#666" />
      </button>
      <button
        type="button"
        onClick={handleDecrement}
        className="text-lg font-bold text-[#555] hover:text-black transition duration-150 ease-in-out">
         <IconNumberArrowDown size={18} color="#666" />
      </button>
    </div>
  );
}

