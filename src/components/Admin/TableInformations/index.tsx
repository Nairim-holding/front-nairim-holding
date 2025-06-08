import Property from "@/types/property";
import ListActions from "./ListActions";

interface TableInformationsProps {
  data: Property[];
}

export default function TableInformations({ data }: TableInformationsProps) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-[#ECECEC] uppercase text-[#111111B2]">
          <tr>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Nome Fantasia</th>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Quartos</th>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Banheiros</th>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Vagas na Garagem</th>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Área Privativa (m²)</th>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Número do Andar</th>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Área Total (m²)</th>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Mobiliado</th>
            <th className="py-3 px-2 text-center font-normal text-[14px]">Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr
              key={e.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center"
            >
              <td className="py-3 px-2 truncate">{e.title}</td>
              <td className="py-3 px-2">{e.bedrooms}</td>
              <td className="py-3 px-2">{e.bathrooms}</td>
              <td className="py-3 px-2">{e.garage_spaces}</td>
              <td className="py-3 px-2">{e.area_built}</td>
              <td className="py-3 px-2">{e.floor_number}</td>
              <td className="py-3 px-2">{e.area_total}</td>
              <td className="py-3 px-2">{e.furnished ? "Sim" : "Não"}</td>
              <td className="py-3 px-2">
                <ListActions id={e.id} route={"property"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
