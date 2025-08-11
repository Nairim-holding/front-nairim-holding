import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IncrementDecrementButtonsProps } from "./type";

export default function IncrementDecrementButtons({handleDecrement, handleIncrement}: IncrementDecrementButtonsProps) {
  return (
    <div className="absolute right-2 flex flex-col items-center py-2">
      <button
        type="button"
        onClick={handleIncrement}
        className="text-lg font-bold text-[#555] hover:text-black transition duration-150 ease-in-out">
        <MdKeyboardArrowUp size={18} />
      </button>
      <button
        type="button"
        onClick={handleDecrement}
        className="text-lg font-bold text-[#555] hover:text-black transition duration-150 ease-in-out">
        <MdKeyboardArrowDown size={18} />
      </button>
    </div>
  );
}

