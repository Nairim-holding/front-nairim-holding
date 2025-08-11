"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItemProps } from './type';

export default function NavItem({ href, children, title, handleMouseLeave }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      className={`li-hover rounded-lg w-full bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#6D28D9] hover:text-[#fff] ${
        isActive
          ? 'li-active from-[#8B5CF6] to-[#6D28D9] text-[#fff]'
          : 'text-gray-700 hover:text-purple-600'
      }`}
    >
      <Link href={href} title={title} className="flex gap-5 justify-start w-full py-3 px-3" onClick={handleMouseLeave}>{children}</Link>
    </li>
  );
}
