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
            {[
              'ID', 'Proprietário', 'Nome', 'CEP', 'Endereço', 'Bairro', 'Cidade', 'UF',
              'Tipo do imóvel', 'Quartos', 'Banheiros', 'Lavabos', 'Vagas na Garagem',
              'Área Total (m²)', 'Área Privativa (m²)', 'Fachada', 'Mobiliado',
              'Número de Andar', 'Inscrição fiscal', 'Observações', 'Ação'
            ].map((title, idx) => (
              <th
                key={idx}
                className={`py-3 px-6 text-center font-normal text-[14px] ${
                  title === 'Ação' ? 'sticky right-0 bg-[#ECECEC] z-10 min-w-[100px] z-10' : 'min-w-[150px]'
                }`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id} className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
              <td className="py-3 px-6">{e.id}</td>
              <td className="py-3 px-6">{e.owner?.name}</td>
              <td className="py-3 px-6 truncate">{e.title}</td>
              <td className="py-3 px-6">{e.addresses?.[0]?.address.zip_code ?? ''}</td>
              <td className="py-3 px-6">
                {e.addresses?.[0] ? `${e.addresses[0].address.street}, ${e.addresses[0].address.number}` : ''}
              </td>
              <td className="py-3 px-6">{e.addresses?.[0]?.address.district ?? ''}</td>
              <td className="py-3 px-6">{e.addresses?.[0]?.address.city ?? ''}</td>
              <td className="py-3 px-6">{e.addresses?.[0]?.address.state ?? ''}</td>
              <td className="py-3 px-6">{e.type?.description}</td>
              <td className="py-3 px-6">{e.bedrooms}</td>
              <td className="py-3 px-6">{e.bathrooms}</td>
              <td className="py-3 px-6">{e.half_bathrooms}</td>
              <td className="py-3 px-6">{e.garage_spaces}</td>
              <td className="py-3 px-6">{e.area_total}</td>
              <td className="py-3 px-6">{e.area_built}</td>
              <td className="py-3 px-6">{e.frontage}</td>
              <td className="py-3 px-6">{e.furnished ? 'Sim' : 'Não'}</td>
              <td className="py-3 px-6">{e.floor_number}</td>
              <td className="py-3 px-6">{e.tax_registration}</td>
              <td className="py-3 px-6">{e.notes}</td>
              <td className="py-3 px-6 sticky right-0 bg-white z-10">
                <ListActions id={e.id} name={e.title} route={'property'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
