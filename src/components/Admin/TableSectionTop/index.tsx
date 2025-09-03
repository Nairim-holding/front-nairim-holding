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
}: SectionTopProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(search ?? "");
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCheckboxes, setSelectedCheckboxes] =
    useState<HTMLInputElement[] | null>(null);

  const {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    popUpDelete,
    setPopUpDelete,
  } = useUIStore();

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

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, count);

  function verifyCheckBox(): HTMLInputElement[] | null {
    const checkBoxes = Array.from(document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:checked'
    )).filter(cb => cb.id);

    if (checkBoxes.length < 1) {
      setErrorMessage({
        message: "Escolha os registros que deseja excluir.",
        visible: true,
      });
      return null;
    }
    return checkBoxes;
  }

  async function del() {
    try {
      const checkBoxes = verifyCheckBox();
      checkBoxes?.forEach(async (checkBox) => {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_URL_API}/${routeApi}/${checkBox.value}`
        );
        if (response.status == 200) {
          setVisible(!visible);
          setSuccessMessage({
            message: response.data.message
              ? response.data.message
              : `Registro "${name}" deletado com sucesso`,
            visible: true,
          });
          router.refresh();
        }
      });
    } catch (error) {
      setVisible(!visible);
      setErrorMessage({
        message: `Erro ao deletar ${name}.`,
        visible: true,
      });
    }
  }

  useEffect(() => {
    if (!selectedCheckboxes) return;

    setPopUpDelete({
      visible: visible,
      onConfirm: del,
      title:
        selectedCheckboxes.length > 1
          ? "Remover registros"
          : `Tem certeza que deseja remover ${delTitle} ${selectedCheckboxes[0].id}`,
      subtitle:
        selectedCheckboxes.length > 1 ? (
          `Você selecionou ${selectedCheckboxes.length} registros. Tem certeza que deseja removê-los?`
        ) : (
          <>
            Tem certeza que deseja remover{" "}
            <strong>{selectedCheckboxes[0].id}</strong>?
          </>
        ),
      setVisible: setVisible,
    });
  }, [selectedCheckboxes, visible]);

  function handleClickTrash() {
    const selected = verifyCheckBox();
    if (!selected) return;

    setSelectedCheckboxes(selected);
    setVisible(true);
  }

  return (
    <div className="flex justify-between items-center flex-wrap mb-1 mt-2">
      <div className="flex items-center gap-5 max-w-[500px] w-full sm:flex-wrap">
        <div className="flex items-center gap-4">
          <Link href={hrefAdd}>
            <IconeAdd className="svg-darkmode-estatic" />
          </Link>
          <Link href={"#"}>
            <IconFilter size={20} color="#666" />
          </Link>
          <button onClick={handleClickTrash}>
            <IconTrash size={20} color="#666" />
          </button>
        </div>

        <div className="flex border py-2 px-3 rounded-lg border-[#CCCCCC] w-full gap-3">
          <input
            className="border-none outline-none w-full text-[14px] font-normal text-[#111111B2]"
            type="search"
            placeholder="Pesquisar por Nome Fantasia, Cidade, CEP, Banhei..."
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

      <Pagination
        currentPage={currentPage}
        limit={limit}
        route={route}
        search={search}
        totalPage={totalPage}
      />
    </div>
  );
}