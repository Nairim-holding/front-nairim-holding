"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";

import IconeEndereco from "@/../public/icons/endereco.svg";
import IconeCep from "@/../public/icons/cep.svg";
import IconeRua from "@/../public/icons/rua.svg";
import IconeNumero from "@/../public/icons/numero.svg";
import IconeBairro from "@/../public/icons/predio.svg";
import IconeCidade from "@/../public/icons/cidade.svg";
import IconeEstado from "@/../public/icons/estado.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUIStore } from "@/stores/uiStore";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Tenant from "@/types/tenant";

export default function Page() {
  const {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
  } = useUIStore();
  const router = useRouter();
  const { control, reset, watch } = useForm();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    const loadData = async () => {
      const stored = localStorage.getItem(`addressTenantEdit-${id}`);

      if (stored) {
        const parsed = JSON.parse(stored);
        reset(parsed);
        setLoadedFromStorage(true);
        setHasLoaded(true);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/tenant/${id}`
        );
        const tenantData = response.data as Tenant;
        const address = tenantData?.addresses?.[0]?.address;

        if (tenantData) {
          reset({
            zip_code: address?.zip_code || "",
            street: address?.street || "",
            number: address?.number || "",
            district: address?.district || "",
            city: address?.city || "",
            state: address?.state || "",
            country: address?.country || "Brasil",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }

      setHasLoaded(true);
    };

    loadData();
  }, [id, reset]);

  const [cepResult, setCepResult] = useState({
    street: "",
    district: "",
    city: "",
    state: "",
  });
  const cep = watch("zip_code") as string;
  useEffect(() => {
    const fetchCEP = async () => {
      if (!cep) return;
      if (cep && cep.length === 9) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL_API}/cep/${cep}`
          );
          const { bairro, uf, localidade, logradouro } = response.data;

          if (response.status === 200) {
            const { bairro, uf, localidade, logradouro } = response.data;

            setCepResult({
              district: bairro,
              state: uf,
              city: localidade,
              street: logradouro,
            });

            reset((prev) => ({
              ...prev,
              street: logradouro,
              district: bairro,
              city: localidade,
              state: uf,
            }));
          }
        } catch (error) {
          console.log(error);
          if (axios.isAxiosError(error)) {
            const message =
              error.response?.data?.error ?? "Erro ao buscar CEP.";
            setErrorMessage({
              message,
              visible: true,
            });
            return;
          }
          console.error("Erro inesperado:", error);
          setErrorMessage({
            message: "Erro inesperado ao buscar o CEP.",
            visible: true,
          });
        }
      }
    };

    fetchCEP();
  }, [cep]);

  const watchedValues = watch();
  const requiredFields = ["zip_code", "number"];
  const [isFormComplete, setIsFormComplete] = useState(false);
  const handleSave = () => {
    const values = watchedValues;

    const allFilled = requiredFields.every((field) => {
      const value = values[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ""
      );
    });

    if (allFilled) {
      localStorage.setItem(`addressTenantEdit-${id}`, JSON.stringify(values));
      setSuccessMessage({
        visible: true,
        message: 'Endereço do inquilino salvo com sucesso!'
      });
      router.push(`/dashboard/inquilinos/editar/${id}/contato`);
    }
  };

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
      localStorage.setItem(`addressTenantEdit-${id}`, JSON.stringify(watchedValues));
    } else if (!loadedFromStorage) {
      localStorage.removeItem(`addressTenantEdit-${id}`);
    }
  }, [watchedValues, hasLoaded, loadedFromStorage]);
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
        title="Endereço"
        svg={<IconeEndereco className="svg-darkmode-estatic" />}>
        <Controller
          name="zip_code"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              mask="cep"
              label="CEP"
              id="zip_code"
              required
              placeHolder="00000-000"
              type="text"
              tabIndex={1}
              autoFocus
              svg={<IconeCep className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="street"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              disabled
              label="Rua"
              id="street"
              placeHolder="Das Flores"
              type="text"
              tabIndex={2}
              svg={<IconeRua className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Numero"
              id="number"
              placeHolder="numero"
              type="number"
              required
              tabIndex={3}
              svg={<IconeNumero className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="district"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              disabled
              label="Bairro"
              id="district"
              placeHolder="Tupinambá"
              type="text"
              tabIndex={4}
              svg={<IconeBairro className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              disabled
              label="Cidade"
              id="city"
              placeHolder="Garça"
              type="text"
              tabIndex={5}
              svg={<IconeCidade className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="state"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              disabled
              label="Estado"
              id="state"
              placeHolder="SP"
              type="text"
              tabIndex={6}
              svg={<IconeEstado className="svg-darkmode-estatic" />}></Input>
          )}
        />

        <Controller
          name="country"
          control={control}
          defaultValue="Brasil"
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              disabled
              label="Pais"
              id="country"
              placeHolder="Brasil"
              type="text"
              tabIndex={7}
              svg={<IconeEstado className="svg-darkmode-estatic" />}></Input>
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
            tabIndex={15}>
            Salvar
          </button>
        </div>
      </Form>
    </>
  );
}