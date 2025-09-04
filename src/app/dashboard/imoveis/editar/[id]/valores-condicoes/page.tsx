"use client";
import Input from "@/components/Ui/Input";
import Select from "@/components/Ui/Select";
import TextArea from "@/components/Ui/TextArea";
import Form from "@/components/Ui/Form";

import IconeCifrao from "@/../public/icons/cifrao.svg";
import IconeValorImovel from "@/../public/icons/valor.svg";
import IconeDataCompra from "@/../public/icons/calendario.svg";
import IconeValorIptu from "@/../public/icons/iptu.svg";
import IconeAluguel from "@/../public/icons/chave.svg";
import IconeValorCondominio from "@/../public/icons/predio.svg";
import IconeStatusAtual from "@/../public/icons/aviso.svg";
import IconeObservacoes from "@/../public/icons/martelo.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useUIStore } from "@/stores/uiStore";
import formatDateValueInput from "@/utils/formatDateValueInput";

export default function Page() {
  const options = [
    { label: "Disponível", value: "AVAILABLE" },
    { label: "Ocupado", value: "OCCUPIED" },
  ];

  const {
    successMessage, setSuccessMessage,
    errorMessage, setErrorMessage,
  } = useUIStore();
  const router = useRouter();

  const { control, register, reset, watch } = useForm();
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  const [hasLoaded, setHasLoaded] = useState(false);

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const loadData = async () => {
      const stored = localStorage.getItem(`valuesPropertyEdit-${id}`);

      if (stored) {
        const parsed = JSON.parse(stored);
        reset(parsed);
        setHasLoaded(true);
        setLoadedFromStorage(true);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/property/${id}`
        );
        const values = response.data?.values?.[0];
        if (values) {
          reset({
            purchase_value: values?.purchase_value || "",
            purchase_date: formatDateValueInput(values?.purchase_date) || "",
            property_tax: values?.property_tax || "",
            rental_value: values?.rental_value || "",
            condo_fee: values?.condo_fee || "",
            current_status: values?.current_status || "",
            sale_value: values?.sale_value || "",
            sale_date: formatDateValueInput(values?.sale_date) || "",
            extra_charges: values?.extra_charges || "",
            sale_rules: values?.sale_rules || "",
            lease_rules: values?.lease_rules || "",
            notes: values?.notes || "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }

      setHasLoaded(true);
    };

    loadData();
  }, [id, reset]);

  const watchedValues = watch();
  const requiredFields = [
    "purchase_value",
    "purchase_date",
    "property_tax",
    "rental_value",
    "condo_fee",
    "current_status",
  ];

  const [isFormComplete, setIsFormComplete] = useState(false);
  useEffect(() => {
    if (!hasLoaded) return;

    const isComplete = requiredFields.every((field) => {
      const value = watchedValues[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ""
      );
    });

    setIsFormComplete(isComplete);

    if (isComplete) {
      localStorage.setItem(`valuesPropertyEdit-${id}`, JSON.stringify(watchedValues));
    } else if (!loadedFromStorage) {
      localStorage.removeItem(`valuesPropertyEdit-${id}`);
    }
  }, [watchedValues, hasLoaded, loadedFromStorage]);

  const handleSave = () => {
    const values = watchedValues;

    const allFilled = requiredFields.every((field) => {
      const value = values[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ""
      );
    });

    if (allFilled) {
      localStorage.setItem(`valuesPropertyEdit-${id}`, JSON.stringify(values));
      setSuccessMessage({
        visible: true,
        message: 'Valores e condições salvos com sucesso!'
      });
      router.push(`/dashboard/imoveis/editar/${id}/midias`);
    }
  };
  return (
    <>
      <NavigationBar
        allEnabled
        steps={[
          {
            path: `/dashboard/imoveis/editar/${id}/dados-imovel`,
            label: "Dados do Imóvel",
            key: "",
            icon: 0
          },
          {
            path: `/dashboard/imoveis/editar/${id}/endereco`,
            label: "Endereço",
            key: "",
            icon: 1
          },
          {
            path: `/dashboard/imoveis/editar/${id}/valores-condicoes`,
            label: "Valores e Condições",
            key: "",
            icon: 2
          },
          {
            path: `/dashboard/imoveis/editar/${id}/midias`,
            label: "Mídias",
            key: "",
            icon: 4
          },
        ]}
        id={id}></NavigationBar>
      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Valores e Condições"
        svg={<IconeCifrao />}>
        <Controller
          name="purchase_value"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              type="text"
              tabIndex={1}
              autoFocus
              mask="money"
              label="Valor do Imóvel (Compra)"
              id="purchase_value"
              required
              placeHolder="Digite o Valor do Imóvel"
              svg={<IconeValorImovel className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="purchase_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              type="date"
              tabIndex={2}
              label="Data Compra"
              id="purchase_date"
              required
              placeHolder="12/05/2021"
              svg={<IconeDataCompra className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="property_tax"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Valor IPTU"
              id="property_tax"
              required
              placeHolder="Digite o Valor do IPTU"
              type="text"
              tabIndex={3}
              mask="money"
              svg={<IconeValorIptu className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="rental_value"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Valor Aluguel"
              id="rental_value"
              required
              placeHolder="Digite o Valor do Aluguel"
              type="text"
              tabIndex={4}
              mask="money"
              svg={<IconeAluguel className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="condo_fee"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Valor Condomínio"
              id="condo_fee"
              required
              placeHolder="Digitte o Valor do Condomínio"
              type="text"
              tabIndex={5}
              mask="money"
              svg={<IconeValorCondominio className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="current_status"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              onChange={field.onChange}
              defaultValue={field.value}
              label="Status Atual"
              required
              id="current_status"
              options={options}
              svg={<IconeStatusAtual className="svg-darkmode-estatic" />}></Select>
          )}
        />

        <Controller
          name="sale_value"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Valor de Venda"
              id="sale_value"
              placeHolder="Digite o Valor de Venda"
              type="text"
              tabIndex={6}
              mask="money"
              svg={<IconeValorImovel className="svg-darkmode-estatic" />}
            />
          )}
        />

        <Controller
          name="sale_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Data da Venda"
              id="sale_date"
              type="date"
              tabIndex={7}
              placeHolder="12/06/2024"
              svg={<IconeDataCompra className="svg-darkmode-estatic" />}
            />
          )}
        />

        <Controller
          name="extra_charges"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Encargos / Custos Extras"
              id="extra_charges"
              type="text"
              tabIndex={8}
              mask="money"
              placeHolder="Digite o Valor dos Custos Extras"
              svg={<IconeValorImovel className="svg-darkmode-estatic" />}
            />
          )}
        />

        <TextArea
          {...register("sale_rules")}
          placeHolder="Regras específicas para a venda"
          label="Regras de Venda"
          id="sale_rules"
          svg={<IconeObservacoes className="svg-darkmode-estatic" />}
        />

        <TextArea
          {...register("lease_rules")}
          placeHolder="Escreva detalalhes não expecificados anteriormente"
          label="Regras de Locação"
          id="lease_rules"
          svg={<IconeObservacoes className="svg-darkmode-estatic"></IconeObservacoes>}
        />

        <TextArea
          {...register("notes")}
          placeHolder="Anotações adicionais sobre o imóvel"
          label="Observações Gerais"
          id="notes"
          svg={<IconeObservacoes className="svg-darkmode-estatic" />}
        />

        <div className="w-full flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSave}
            className={`max-w-[200px] w-full h-[40px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-[#fff] rounded-lg text-[16px] font-normal border-[#8B5CF6] drop-shadow-purple-soft ${
              !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormComplete}
            tabIndex={15}>
            Salvar
          </button>
        </div>
      </Form>
    </>
  );
}
