import Link from "next/link";
import { SectionProps } from "./type";

export default function Section({ children, title, href, hrefText }: SectionProps ) {
  return (
    <section style={{ boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)' }}
      className={`font-poppins m-4 p-5 bg-white flex flex-col rounded-xl drop-shadow-section-2`}>
        <div className="flex justify-between items-center">
          <h1 className="text-[24px]">{title}</h1>
          {href && <Link href={href} className="bg-[#D9D9D9] px-5 py-3 rounded-xl">{hrefText}</Link>}
        </div>
        {children}
    </section>
  );
}
