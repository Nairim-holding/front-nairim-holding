"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SectionTopProps } from "./type";
import IconSearch from "@/components/Icons/IconSearch";

export default function SectionTop({ textAdd, hrefAdd, search }: SectionTopProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(search ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (inputValue.trim()) {
        params.set("search", inputValue.trim());
      } else {
        params.delete("search");
      }
      params.set("page", "1"); 
      router.push(`?${params.toString()}`);
    }, 200); 

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <div className="flex justify-between items-center flex-wrap mb-4 mt-2">
      <div className="flex border py-2 px-3 rounded-lg border-[#CCCCCC] max-w-[420px] w-full gap-3">
        <input
          className="border-none outline-none w-full text-[14px] font-normal text-[#111111B2]"
          type="search"
          placeholder="Pesquisar por Nome Fantasia, Cidade, CEP, Banhei..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconSearch size={25} color="#111111"></IconSearch>
      </div>

      <Link href={hrefAdd} className="bg-[#D9D9D9] px-5 py-3 rounded-xl dark:bg-[#000]">
        {textAdd}
      </Link>
    </div>
  );
}
