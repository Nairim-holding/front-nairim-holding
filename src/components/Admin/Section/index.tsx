import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

interface SectionProps {
    children: React.ReactNode,
    title: string;
}

export default function Section({ children, title }: SectionProps ) {
  return (
    <section style={{ boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)' }}
      className={`${poppins.variable} m-5 p-10 bg-white flex flex-col rounded-xl drop-shadow-section-2`}>
        <h1 className="text-[24px] pl-7">{title}</h1>
        {children}
    </section>
  );
}
