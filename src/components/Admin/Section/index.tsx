import Link from "next/link";
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

interface SectionProps {
    children: React.ReactNode,
    title: string;
    href?: string;
    hrefText?: string;
}

export default function Section({ children, title, href, hrefText }: SectionProps ) {
  return (
    <section style={{ boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)' }}
      className={`${poppins.variable} m-4 p-5 bg-white flex flex-col rounded-xl drop-shadow-section-2`}>
        <div className="flex justify-between items-center">
          <h1 className="text-[24px]">{title}</h1>
          {href && <Link href={href} className="bg-[#D9D9D9] px-5 py-3 rounded-xl">{hrefText}</Link>}
        </div>
        {children}
    </section>
  );
}
