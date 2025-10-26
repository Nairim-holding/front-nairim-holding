import Link from "next/link";
import { SectionProps } from "./type";

export default function Section({ children, title, href, hrefText }: SectionProps ) {
  return (
    <section
      className={`font-poppins bg-white flex flex-col p-2`}>
        <div className="flex justify-between items-center">
          <h1 className="text-[24px] pl-[60px]">{title}</h1>
          {href && <Link href={href} className="bg-[#D9D9D9] px-5 py-3 rounded-xl">{hrefText}</Link>}
        </div>
        {children}
    </section>
  );
}
