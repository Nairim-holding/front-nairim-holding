"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SectionTopProps } from "./type";
import IconSearch from "@/components/Icons/IconSearch";
import Pagination from "../../Ui/Pagination";
import SelectLimit from "../../Ui/SelectLimit";
import IconeAdd from "@/../public/icons/add.svg";
import IconFilter from "@/components/Icons/IconFilter";
import IconTrash from "@/components/Icons/IconTrash";
import { useUIStore } from "@/stores/uiStore";
import axios from "axios";
import FilterModal from "../FilterModal";
import { FieldMeta } from "@/types/fieldMeta";

export default function SectionTop({
  hrefAdd,
  limit,
  currentPage,
  search = "",
  route,
  totalPage,
  count,
  routeApi,
  delTitle,
  data,
  fields,
  titlePlural,
}: SectionTopProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(search ?? "");
  const [visible, setVisible] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<HTMLInputElement[] | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);

  const { setSuccessMessage, setErrorMessage, setPopUpDelete } = useUIStore();

  // Pesquisa por nome
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (inputValue.trim()) params.set("search", inputValue.trim());
      else params.delete("search");
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }, 200);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, count);

  function verifyCheckBox(): HTMLInputElement[] | null {
    const checkBoxes = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked')
    ).filter((cb) => cb.id);

    if (!checkBoxes.length) {
      setErrorMessage({ message: "Escolha os registros que deseja excluir.", visible: true });
      return null;
    }
    return checkBoxes;
  }

  async function del() {
    const checkBoxes = verifyCheckBox();
    if (!checkBoxes) return;

    try {
      for (const checkBox of checkBoxes) {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/${routeApi}/${checkBox.value}`);
        if (response.status === 200) {
          setSuccessMessage({
            message: response.data.message || `Registro "${checkBox.value}" deletado com sucesso`,
            visible: true,
          });
        }
      }
      setVisible(false);
      router.refresh();
    } catch {
      setVisible(false);
      setErrorMessage({ message: `Erro ao deletar ${delTitle}.`, visible: true });
    }
  }

  function handleApplyFilter(filters: Record<string, string | number | boolean | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (!value && value !== 0) params.delete(key);
      else params.set(key, String(value));
    });
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    setFilterVisible(false);
  }

  function handleClickTrash() {
    const selected = verifyCheckBox();
    if (!selected) return;
    setSelectedCheckboxes(selected);
    setVisible(true);
  }

  useEffect(() => {
    if (!selectedCheckboxes) return;
    setPopUpDelete({
      visible,
      onConfirm: del,
      title:
        selectedCheckboxes.length > 1
          ? "Remover registros"
          : `Tem certeza que deseja remover ${delTitle} ${selectedCheckboxes[0].id}`,
      subtitle:
        selectedCheckboxes.length > 1
          ? `Você selecionou ${selectedCheckboxes.length} registros. Tem certeza que deseja removê-los?`
          : (
              <>
                Tem certeza que deseja remover <strong>{selectedCheckboxes[0].id}</strong>?
              </>
            ),
      setVisible,
    });
  }, [selectedCheckboxes, visible]);

  function handleClickFilter(e: React.MouseEvent) {
    e.stopPropagation();
    setFilterVisible((prev) => !prev);
  }

  function handleClearFilters() {
    const params = new URLSearchParams(searchParams.toString());
    fields?.forEach((field) => field.field && params.delete(field.field));
    params.delete("search");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    setFilterVisible(false);
  }

  return (
    <div className="flex justify-center gap-1 sm:justify-between items-center flex-wrap mb-1 mt-2">
      <div className="flex items-center justify-center sm:justify-start gap-5 max-w-[500px] w-full flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-4">
          <Link href={hrefAdd}>
            <IconeAdd className="svg-darkmode-estatic" />
          </Link>
          <button onClick={handleClickFilter}>
            <IconFilter size={20} color="#666" />
          </button>
          <button onClick={handleClickTrash}>
            <IconTrash size={20} color="#666" />
          </button>
        </div>

        {filterVisible && (
          <div className="absolute top-[90px] left-[40px] z-40 w-full max-w-[650px]">
            <FilterModal
              visible={filterVisible}
              setVisible={setFilterVisible}
              onApply={handleApplyFilter}
              onClear={handleClearFilters}
              title={titlePlural ?? ''}
              fields={fields?.map(f => ({
                key: f.field as string,
                label: f.label,
                type: f.type,
                options: f.options ?? [],
              }))}
            />
          </div>
        )}

        <div className="flex border py-2 px-3 rounded-lg border-[#CCCCCC] w-full gap-3">
          <input
            className="border-none outline-none w-full text-[14px] font-normal text-[#111111B2]"
            type="search"
            placeholder="Pesquisar por Nome, E-mail, etc..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <IconSearch size={25} color="#666" />
        </div>
      </div>

      <SelectLimit limit={limit} route={route} search={search} />

      <p className="text-[16px] font-normal text-[#111111B2] laptop:relative tablet:text-center tablet:w-full">
        Exibindo {start} a {end} de {count} registros
      </p>

      <Pagination currentPage={currentPage} limit={limit} route={route} search={search} totalPage={totalPage} />
    </div>
  );
}
