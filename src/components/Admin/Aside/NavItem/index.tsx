'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function NavItem({ href, children, title }: {href: string, children: React.ReactNode; title: string}) {
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
      <Link href={href} title={title} className="flex gap-5 justify-start w-full py-3 px-3">{children}</Link>
    </li>
  );
}
