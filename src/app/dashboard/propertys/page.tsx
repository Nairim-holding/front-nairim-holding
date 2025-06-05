import Property from "@/types/property";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";

export default async function Page(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/property`);
    const data = await response.json() as Property[];

    return(
        <section className="m-10 p-10 bg-white flex flex-col rounded-xl">
            <div className="flex justify-between items-center flex-wrap mb-10">
                <h1 className="text-[24px]">Meus Imóveis</h1>
                <Link href={'#'} className="bg-[#D9D9D9] px-5 py-3 rounded-xl">Adicionar novo Imóvel</Link>
            </div>

            <ul className="rounded-xl border overflow-auto">
                <li className="flex bg-[#ECECEC] text-gray-700 font-semibold text-sm uppercase tracking-wider py-3 px-4 rounded-t-lg">
                    <p className="flex-1 text-center flex justify-center items-center">Nome Fantasia</p>
                    <p className="flex-1 text-center flex justify-center items-center">Quartos</p>
                    <p className="flex-1 text-center flex justify-center items-center">Banheiros</p>
                    <p className="flex-1 text-center flex justify-center items-center">Vagas na Garagem</p>
                    <p className="flex-1 text-center flex justify-center items-center">Área Privativa (m²)</p>
                    <p className="flex-1 text-center flex justify-center items-center">Número do Andar</p>
                    <p className="flex-1 text-center flex justify-center items-center">Testada (m) </p>
                    <p className="flex-1 text-center flex justify-center items-center">Mobiliado</p>
                    <p className="flex-1 text-center flex justify-center items-center">Ação</p>
                </li>
                {data.map((e) => (
                    <li className="flex bg-white hover:bg-gray-50 text-gray-800 text-sm py-3 px-4 border-b border-gray-200 last:border-b-0" key={e.id}>
                        <p className="flex-1 text-center truncate">{e.title}</p>
                        <p className="flex-1 text-center">{e.bedrooms}</p>
                        <p className="flex-1 text-center">{e.bathrooms}</p>
                        <p className="flex-1 text-center">{e.garage_spaces}</p>
                        <p className="flex-1 text-center">{e.area_built}</p>
                        <p className="flex-1 text-center">{e.floor_number}</p>
                        <p className="flex-1 text-center">{e.area_total} </p>
                        <p className="flex-1 text-center">
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
        </section>
    )
} 