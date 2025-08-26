"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";
import { Controller, useForm } from "react-hook-form";

import IconeCasa from "@/../public/icons/casa.svg";
import IconeAndares from "@/../public/icons/predio.svg";
import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUIStore } from "@/stores/uiStore";
import Tenant from "@/types/tenant";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const { control, register, reset, watch } = useForm();
  const watchedValues = watch();
  const [hasLoaded, setHasLoaded] = useState(false);
  const { setSuccessMessage } = useUIStore();

  const requiredFields = [
    "name",
    "internal_code",
    "occupation",
    "marital_status",
    "cnpj",
    "cpf",
    "state_registration",
    "municipal_registration",
  ];

  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);

  useEffect(() => {
    async function getTenantById() {
      try {
        const saved = localStorage.getItem(`dataTenantEdit-${id}`);

        if (saved) {
          const parsed = JSON.parse(saved);
          reset(parsed);
          setHasLoaded(true);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/tenant/${id}`
        );
        const tenantData = response.data as Tenant;
        reset({
          name: tenantData.name || "",
          internal_code: tenantData.internal_code || "",
          cnpj: tenantData.cnpj || "",
          cpf: tenantData.cpf || "",
          municipal_registration: tenantData.municipal_registration || "",
          state_registration: tenantData.state_registration || "",
          occupation: tenantData.occupation || "",
          marital_status: tenantData.marital_status || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados do inquilino:", error);
      } finally {
        setHasLoaded(true);
      }
    }

    getTenantById();
  }, [id, reset]);

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
      localStorage.setItem(
        `dataTenantEdit-${id}`,
        JSON.stringify(watchedValues)
      );
    } else {
      localStorage.removeItem(`dataTenantEdit-${id}`);
    }
  }, [watchedValues, hasLoaded]);

  const handleSave = () => {
    localStorage.setItem(`dataTenantEdit-${id}`, JSON.stringify(watchedValues));
    setSuccessMessage({
      visible: true,
      message: "Dados do inquilino salvos com sucesso!",
    });
    router.push(`/dashboard/inquilinos/editar/${id}/endereco`);
  };

  return (
    <>
      <NavigationBar
        allEnabled
        steps={[
          {
            path: `/dashboard/inquilinos/editar/${id}/dados-inquilino`,
            label: "Dados do Inquilino",
            key: "",
            icon: 0,
          },
          {
            path: `/dashboard/inquilinos/editar/${id}/endereco`,
            label: "Endereço",
            key: "",
            icon: 1,
          },
          {
            path: `/dashboard/inquilinos/editar/${id}/contato`,
            label: "Contato",
            key: "",
            icon: 3,
          },
        ]}
      />
      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Dados Inquilino"
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
              placeHolder="Nome do inquilino"
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
              required
              placeHolder="Código Interno do inquilino"
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
              placeHolder="Profissão do inquilino"
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
              placeHolder="Estado Civil do inquilino"
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
              mask="cnpj"
              maxLength={18}
              required
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
              type="cpf"
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
              required
              placeHolder="Digite a inscrição municipal"
              type="text"
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
              required
              placeHolder="Digite a inscrição estadual"
              type="text"
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
            tabIndex={9}>
            Salvar
          </button>
        </div>
      </Form>
    </>
  );
}
