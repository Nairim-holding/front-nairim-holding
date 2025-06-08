import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import localFont from 'next/font/local';

const poppinsFont = localFont({
  src: '../../../fonts/Poppins.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-poppins',
});

const poppinsFont700 = localFont({
  src: '../../../fonts/Poppins-Bold.ttf',
  weight: '700',
  style: 'normal',
  variable: '--font-poppins',
});

interface PopupProps{
    title: string;
    subtitle: string | ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => Promise<any>;
}

export default function Popup({ title, subtitle, visible, setVisible, onConfirm }: PopupProps){
    return(
        visible && 
        <div className={`fixed w-full h-full bg-[#000000BF] top-0 left-0 z-[1000000] flex items-center justify-center p-4 ${poppinsFont.className}`}>
            <div className="bg-[#fff] p-8 rounded-xl max-w-[550px] w-full relative">
                <button className="absolute right-5 top-[15px]" onClick={() => setVisible(!visible)}>
                    <IoMdClose size={20} color="#111111B2" />
                </button>

                <h2 className={`${poppinsFont700.className} text-[#111111B2] font-bold text-[24px] pt-8 text-left`}>{title}</h2>
                <p className="pt-8 pb-10 text-[#111111B2] font-normal text-[16px] text-left">{subtitle}</p>

                <div className="flex items-end justify-end gap-5 mt-8">
                    <button className="max-w-[140px] w-full h-[40px] bg-[#F0F0F0] rounded-lg text-[16px] font-medium text-[#666666] border border-[#E0E0E0] drop-shadow-custom-black" onClick={() => setVisible(!visible)}>Não</button>

                    <button className="max-w-[140px] w-full h-[40px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft" onClick={onConfirm}>Sim</button>
                </div>
            </div>
        </div>
    )
}