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
import { useUIStore } from "@/stores/uiStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const options = [
    { label: "Disponível", value: "AVAILABLE" },
    { label: "Ocupado", value: "OCCUPIED" },
  ];

  const { handleSubmit, control, register, reset, watch } = useForm();
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [item, setItem] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("valuesProperty");
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const watchedValues = watch();
  useEffect(() => {
    const requiredFields = [
      "purchase_value",
      "purchase_date",
      "property_tax",
      "rental_value",
      "condo_fee",
      "current_status",
    ];

    const allFilled = requiredFields.every((field) => {
      const value = watchedValues[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ""
      );
    });

    setIsFormComplete(allFilled);
  }, [watchedValues]);

  const {
    successMessage, setSuccessMessage,
    errorMessage, setErrorMessage,
  } = useUIStore();
  const router = useRouter();

  const handleSave = () => {
    if (isFormComplete) {
      localStorage.setItem("valuesProperty", JSON.stringify(watchedValues));
      setItem(true);
      setSuccessMessage({
        visible: true,
        message: "Valores e condições do imovel salvo com sucesso!",
      });
      router.push("/dashboard/imoveis/cadastrar/midias");
    }
  };
  return (
    <>
      <NavigationBar formComplete={item} path="cadastrar"></NavigationBar>
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
              placeHolder="R$ 180.000,00"
              svg={<IconeValorImovel />}></Input>
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
              svg={<IconeDataCompra />}></Input>
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
              placeHolder="R$ 1.440,00"
              type="text"
              tabIndex={3}
              mask="money"
              svg={<IconeValorIptu />}></Input>
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
              placeHolder="R$ 900,00"
              type="text"
              tabIndex={4}
              mask="money"
              svg={<IconeAluguel />}></Input>
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
              placeHolder="R$ 320,00"
              type="text"
              tabIndex={5}
              mask="money"
              svg={<IconeValorCondominio />}></Input>
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
              svg={<IconeStatusAtual />}></Select>
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
              placeHolder="R$ 220.000,00"
              type="text"
              tabIndex={6}
              mask="money"
              svg={<IconeValorImovel />}
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
              svg={<IconeDataCompra />}
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
              placeHolder="R$ 1.000,00"
              svg={<IconeValorImovel />}
            />
          )}
        />

        <TextArea
          {...register("sale_rules")}
          placeHolder="Regras específicas para a venda"
          label="Regras de Venda"
          id="sale_rules"
          svg={<IconeObservacoes />}
        />

        <TextArea
          {...register("lease_rules")}
          placeHolder="Escreva detalalhes não expecificados anteriormente"
          label="Regras de Locação"
          id="lease_rules"
          svg={<IconeObservacoes></IconeObservacoes>}
        />

        <TextArea
          {...register("notes")}
          placeHolder="Anotações adicionais sobre o imóvel"
          label="Observações Gerais"
          id="notes"
          svg={<IconeObservacoes />}
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
