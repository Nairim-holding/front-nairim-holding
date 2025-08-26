"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import IconeCasa from "@/../public/icons/casa.svg";
import IconeAndares from "@/../public/icons/predio.svg";
import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useUIStore } from "@/stores/uiStore";
import { useRouter } from "next/navigation";
import IconVerified from "@/components/Icons/IconVerified";

export default function Page() {
  const [item, setItem] = useState<boolean>(false);

  const { control, reset, watch } = useForm();

  useEffect(() => {
    const saved = localStorage.getItem("dataAgency");
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const watchedValues = watch();
  useEffect(() => {
    const requiredFields = [
      "trade_name",
      "legal_name",
      "cnpj",
      "municipal_registration",
      "state_registration",
      "license_number",
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
      localStorage.setItem("dataAgency", JSON.stringify(watchedValues));
      setItem(true);
      setSuccessMessage({
        visible: true,
        message: 'Dados da imobiliaria salvos com sucesso!'
      });
      router.push('/dashboard/imobiliarias/cadastrar/endereco');
    }
  };
  return (
    <>
      <NavigationBar
        formComplete={item}
        steps={[
          {
            path: `/dashboard/imobiliarias/cadastrar/dados-imobiliaria`,
            label: "Dados da imobiliária",
            key: "dataAgency",
            icon: 0
          },
          {
            path: `/dashboard/imobiliarias/cadastrar/endereco`,
            label: "Endereço",
            key: "addressAgency",
            icon: 1
          },
          {
            path: `/dashboard/imobiliarias/cadastrar/contato`,
            label: "Contato",
            key: "contactAgency",
            icon: 3
          },
        ]}></NavigationBar>
      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Dados da Imobiliária"
        svg={<IconeCasa />}>
        <Controller
          name="trade_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Nome Fantasia"
              id="trade_name"
              required
              placeHolder="Nome para o imóvel"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={1}
              autoFocus
            />
          )}
        />

        <Controller
          name="legal_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Razao Social"
              id="legal_name"
              required
              placeHolder="Nome jurídico da empresa"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={2}
            />
          )}
        />

        <Controller
          name="cnpj"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="CNPJ"
              id="cnpj"
              mask="cnpj"
              maxLength={18}
              required
              placeHolder="00.000.000/0000-00"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={3}
            />
          )}
        />

        <Controller
          name="municipal_registration"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Inscrição Municipal"
              id="municipal_registration"
              required
              placeHolder="Digite a inscrição municipal"
              type="number"
              svg={<IconeAndares className="svg-darkmode-estatic" />}
              tabIndex={5}
            />
          )}
        /> 

        <Controller
          name="state_registration"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Inscrição Estadual"
              id="state_registration"
              required
              placeHolder="Digite a inscrição estadual"
              type="number"
              svg={<IconeAndares className="svg-darkmode-estatic" />}
              tabIndex={4}
            />
          )}
        />

        <Controller
          name="license_number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="CRECI"
              id="license_number"
              required
              placeHolder="Digite o número do CRECI"
              type="text"
              svg={<IconVerified size={20} color="#666" />}
              tabIndex={6}
            />
          )}
        />

        <div className="w-full flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSave}
            className={`max-w-[200px] w-full h-[40px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-[#fff] rounded-lg text-[16px] font-normal border-[#8B5CF6] drop-shadow-purple-soft ${
              !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormComplete}
            tabIndex={15}
            
          >
            Salvar
          </button>
        </div>
      </Form>
    </>
  );
}
