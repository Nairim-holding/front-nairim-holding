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
import IconVerified from "@/components/Icons/IconVerified";
import Agency from "@/types/agency";
import { useUIStore } from "@/stores/uiStore";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const { control, register, reset, watch } = useForm();
  const watchedValues = watch();
  const [hasLoaded, setHasLoaded] = useState(false);
  const {
    setSuccessMessage,
  } = useUIStore();

  const requiredFields = [
    "trade_name",
    "legal_name",
    "cnpj",
    "license_number",
  ];

  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);

  useEffect(() => {
    async function getAgencyById() {
      try {
        const saved = localStorage.getItem(`dataAgencyEdit-${id}`);

        if (saved) {
          const parsed = JSON.parse(saved);
          reset(parsed);
          setHasLoaded(true);
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/agency/${id}`);
        const agencyData = response.data as Agency;
        reset({
          trade_name: agencyData.trade_name || '',
          legal_name: agencyData.legal_name || '',
          cnpj: agencyData.cnpj || '',
          municipal_registration: agencyData.municipal_registration || '',
          state_registration: agencyData.state_registration || '',
          license_number: agencyData.license_number || '',
        });
      } catch (error) {
        console.error("Erro ao buscar dados da agência:", error);
      } finally {
        setHasLoaded(true);
      }
    }

    getAgencyById();
  }, [id, reset]);

  useEffect(() => {
    if (!hasLoaded) return;
    const isComplete = requiredFields.every((field) => {
      const value = watchedValues[field];
      return value !== undefined && value !== null && String(value).trim() !== "";
    });

    setIsFormComplete(isComplete);

    if (isComplete) {
      localStorage.setItem(`dataAgencyEdit-${id}`, JSON.stringify(watchedValues));
    } else {
      localStorage.removeItem(`dataAgencyEdit-${id}`);
    }
  }, [watchedValues, hasLoaded]);

  const handleSave = () => {
    localStorage.setItem(`dataAgencyEdit-${id}`, JSON.stringify(watchedValues));
    setSuccessMessage({
      visible: true,
      message: 'Dados da imobiliária salvos com sucesso!',
    });
    router.push(`/dashboard/imobiliarias/editar/${id}/endereco`);
  };

  return (
    <>
      <NavigationBar
        allEnabled
        steps={[
          {
            path: `/dashboard/imobiliarias/editar/${id}/dados-imobiliaria`,
            label: "Dados da imobiliária",
            key: "",
            icon: 0,
          },
          {
            path: `/dashboard/imobiliarias/editar/${id}/endereco`,
            label: "Endereço",
            key: "",
            icon: 1,
          },
          {
            path: `/dashboard/imobiliarias/editar/${id}/contato`,
            label: "Contato",
            key: "",
            icon: 3,
          },
        ]}
      />
      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Dados da Imobiliária"
        svg={<IconeCasa />}
      >
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
              label="Razão Social"
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
              placeHolder="Digite a inscrição municipal"
              type="number"
              svg={<IconeAndares className="svg-darkmode-estatic" />}
              tabIndex={4}
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
              tabIndex={5}
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
            tabIndex={7}
          >
            Salvar
          </button>
        </div>
      </Form>
    </>
  );
}
