import Property from "@/types/property";
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

export default async function Page(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/property`);
    const data = await response.json() as Property[];

    return(
        <section className={`${poppins.variable} m-10 p-10 bg-white flex flex-col rounded-xl`}>
            <h1 className="text-[24px] pl-7">Meus Imóveis</h1>
            <div className="flex justify-between items-center flex-wrap mb-8 mt-5">
                <div className="flex items-center gap-2">
                    <p className="text-[14px] font-normal text-[#111111B2]">Exibir</p>
                    <select className="border text-[14px] font-normal text-[#111111B2] p-3 rounded-lg border-[#CCCCCC] outline-none">
                        <option className="border text-[14px] font-normal text-[#111111B2]">10</option>
                    </select>
                    <p className="text-[14px] font-normal text-[#111111B2]">registros</p>
                </div>

                <div className="flex border py-2 px-3 rounded-lg border-[#CCCCCC] max-w-[420px] w-full gap-3">
                    <input className="border-none outline-none w-full text-[14px] font-normal text-[#111111B2]" type="search" placeholder="Pesquisar por Nome Fantasia, Cidade, CEP, Banhei..."></input>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.6 21.5L13.3 15.2C12.8 15.6 12.225 15.9167 11.575 16.15C10.925 16.3833 10.2333 16.5 9.5 16.5C7.68333 16.5 6.14583 15.8708 4.8875 14.6125C3.62917 13.3542 3 11.8167 3 10C3 8.18333 3.62917 6.64583 4.8875 5.3875C6.14583 4.12917 7.68333 3.5 9.5 3.5C11.3167 3.5 12.8542 4.12917 14.1125 5.3875C15.3708 6.64583 16 8.18333 16 10C16 10.7333 15.8833 11.425 15.65 12.075C15.4167 12.725 15.1 13.3 14.7 13.8L21 20.1L19.6 21.5ZM9.5 14.5C10.75 14.5 11.8125 14.0625 12.6875 13.1875C13.5625 12.3125 14 11.25 14 10C14 8.75 13.5625 7.6875 12.6875 6.8125C11.8125 5.9375 10.75 5.5 9.5 5.5C8.25 5.5 7.1875 5.9375 6.3125 6.8125C5.4375 7.6875 5 8.75 5 10C5 11.25 5.4375 12.3125 6.3125 13.1875C7.1875 14.0625 8.25 14.5 9.5 14.5Z" fill="#111111" fillOpacity="0.7"/>
                    </svg>
                </div>

                <Link href={'#'} className="bg-[#D9D9D9] px-5 py-3 rounded-xl">Adicionar novo Imóvel</Link>
            </div>

            <ul className="rounded-xl border overflow-auto">
                <li className="flex bg-[#ECECEC] text-gray-700 font-semibold text-sm uppercase tracking-wider py-3 px-2 rounded-t-lg">
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Nome Fantasia</p>
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Quartos</p>
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Banheiros</p>
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Vagas na Garagem</p>
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Área Privativa (m²)</p>
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Número do Andar</p>
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Testada (m) </p>
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Mobiliado</p>
                    <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">Ação</p>
                </li>
                {data.map((e) => (
                    <li className="flex bg-white hover:bg-gray-50 text-gray-800 text-sm py-3 px-2 border-b border-gray-200 last:border-b-0" key={e.id}>
                        <p className="flex-1 text-center flex justify-center items-center truncate text-[14px] font-normal text-[#111111B2] capitalize">{e.title}</p>
                        <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">{e.bedrooms}</p>
                        <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">{e.bathrooms}</p>
                        <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">{e.garage_spaces}</p>
                        <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">{e.area_built}</p>
                        <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">{e.floor_number}</p>
                        <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">{e.area_total} </p>
                        <p className="flex-1 text-center flex justify-center items-center text-[14px] font-normal text-[#111111B2] capitalize">
                            {e.furnished ? "Sim" : "Não"}
                        </p>
                        <div className="flex flex-1 justify-center items-center gap-3">
                            <Link href={"#"}>
                                <IoEyeOutline size={23} color="#111111B2" />
                            </Link>
                            <Link href={"#"}>
                                <GoPencil size={20} color="#111111B2" />
                            </Link>
                            <Link href={"#"}>
                                <FaRegTrashAlt size={19} color="#111111B2" />
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>


            <div className="mt-10 flex justify-between items-center relative">
            <p className="text-[16px] font-normal text-[#111111B2] absolute left-0 z-[0]">Exibindo 1 a 10 de 10 registros</p>
            
            <div className="flex justify-center flex-1">
                <div className="flex items-center gap-3">
                <Link href="#" className="w-[45px] h-[45px] flex items-center justify-center border border-2 border-[#111111B2] rounded-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#111111" fillOpacity="0.7" />
                    </svg>
                </Link>

                <Link href="#" className="bg-[#695CFF] text-[18px] font-bold text-[#ffff] w-[45px] h-[45px] flex items-center justify-center rounded-full">1</Link>
                <Link href="#" className="bg-[#fff] text-[18px] font-bold text-[#111111B2] w-[45px] h-[45px] flex items-center justify-center border border-2 border-[#111111B2] rounded-full">2</Link>


                <Link href="#" className="w-[45px] h-[45px] flex items-center justify-center border border-2 border-[#111111B2] rounded-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.175 9L6.575 14.6L8 16L16 8L8 0L6.575 1.4L12.175 7H0V9H12.175Z" fill="#111111" fillOpacity="0.7" />
                    </svg>
                </Link>
                </div>
            </div>
            </div>

        </section>
    )
} 