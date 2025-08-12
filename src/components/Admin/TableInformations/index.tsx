import ListActions from "./ListActions";
import { TableInformationsProps } from "./type";

export default function TableInformations({ data }: TableInformationsProps) {
  const headers = [
    "ID",
    "Proprietário",
    "Nome",
    "CEP",
    "Endereço",
    "Bairro",
    "Cidade",
    "UF",
    "Tipo do imóvel",
    "Quartos",
    "Banheiros",
    "Lavabos",
    "Vagas na Garagem",
    "Área Total (m²)",
    "Área Privativa (m²)",
    "Fachada",
    "Mobiliado",
    "Número de Andar",
    "Inscrição fiscal",
    "Observações",
    "Ação",
  ];

  return data.length >= 1 ? (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-[#ECECEC] uppercase text-[#111111B2]">
          <tr>
            {headers.map((title, idx) => (
              <th
                key={idx}
                className={`py-2 px-5 text-center font-normal text-[14px] ${
                  title === "Ação"
                    ? "sticky right-0 bg-[#ECECEC] z-10 min-w-[50px]"
                    : "min-w-[50px]"
                }`}>
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((e) => (
            <tr
              key={e.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.id}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.owner?.name}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center truncate">
                  {e.title}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.zip_code ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]
                    ? `${e.addresses[0].address.street}, ${e.addresses[0].address.number}`
                    : ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.district ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.city ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.state ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.type?.description}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.bedrooms}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.bathrooms}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.half_bathrooms}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.garage_spaces}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.area_total}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.area_built}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.frontage}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.furnished ? "Sim" : "Não"}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.floor_number}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.tax_registration}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.notes}
                </div>
              </td>
              <td className="py-2 px-3 sticky right-0 bg-white z-10">
                <div className="min-h-[50px] flex items-center justify-center">
                  <ListActions id={e.id} name={e.title} route={"property"} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="flex justify-center items-center my-3">
      <p className="bg-[#D9D9D9] py-2 px-5 rounded-sm dark:bg-[#000]">Não foi encontrado nenhum registro.</p>
    </div>
  );
}
