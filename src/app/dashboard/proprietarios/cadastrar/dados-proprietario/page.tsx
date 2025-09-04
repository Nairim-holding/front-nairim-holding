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
    const saved = localStorage.getItem("dataOwner");
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const watchedValues = watch();
  useEffect(() => {
    const requiredFields = [
      "name",
      "occupation",
      "marital_status",
      "cnpj",
      "cpf",
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
      localStorage.setItem("dataOwner", JSON.stringify(watchedValues));
      setItem(true);
      setSuccessMessage({
        visible: true,
        message: 'Dados do proprietário salvos com sucesso!'
      });
      router.push('/dashboard/proprietarios/cadastrar/endereco');
    }
  };
  return (
    <>
      <NavigationBar
        formComplete={item}
        steps={[
          {
            path: `/dashboard/proprietarios/cadastrar/dados-proprietario`,
            label: "Dados do Proprietário",
            key: "dataOwner",
            icon: 0
          },
          {
            path: `/dashboard/proprietarios/cadastrar/endereco`,
            label: "Endereço",
            key: "addressOwner",
            icon: 1
          },
          {
            path: `/dashboard/proprietarios/cadastrar/contato`,
            label: "Contato",
            key: "contactOwner",
            icon: 3
          },
        ]}></NavigationBar>
      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Dados do proprietário"
        svg={<IconeCasa />}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Nome"
              id="name"
              required
              placeHolder="Nome do proprietário"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={1}
              autoFocus
            />
          )}
        />

        <Controller
          name="internal_code"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Código Interno"
              id="internal_code"
              placeHolder="Código Interno do proprietário"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={2}
            />
          )}
        />

        <Controller
          name="occupation"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Profissão"
              id="occupation"
              required
              placeHolder="Profissão do proprietário"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={3}
            />
          )}
        />

        <Controller
          name="marital_status"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Estado Civil"
              id="marital_status"
              required
              placeHolder="Estado Civil do proprietário"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={4}
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
              required
              mask="cnpj"
              maxLength={18}
              placeHolder="00.000.000/0000-00"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={5}
            />
          )}
        />

        <Controller
          name="cpf"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="CPF"
              id="cpf"
              mask="cpf"
              maxLength={14}
              required
              placeHolder="000.000.000-00"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={6}
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
              placeHolder="Digite a inscrição municipal"
              type="number"
              svg={<IconeAndares className="svg-darkmode-estatic" />}
              tabIndex={7}
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
              placeHolder="Digite a inscrição estadual"
              type="number"
              svg={<IconeAndares className="svg-darkmode-estatic" />}
              tabIndex={8}
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
            tabIndex={9}
            
          >
            Salvar
          </button>
        </div>
      </Form>
    </>
  );
}
