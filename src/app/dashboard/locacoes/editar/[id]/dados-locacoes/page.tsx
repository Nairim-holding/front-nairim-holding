"use client";
import Input from "@/components/Ui/Input";
import Select from "@/components/Ui/Select";
import Form from "@/components/Ui/Form";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import IconeCasa from "@/../public/icons/casa.svg";
import IconeMobiliado from "@/../public/icons/mobiliado.svg";
import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import IconeDataCompra from "@/../public/icons/calendario.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import axios from "axios";
import Owner from "@/types/owner";
import propertyTypes from "@/types/propertyTypes";
import { useUIStore } from "@/stores/uiStore";
import { useParams, useRouter } from "next/navigation";
import Property from "@/types/property";
import Tenant from "@/types/tenant";
import { Lease } from "@/types/lease";
import formatDateValueInput from "@/utils/formatDateValueInput";

export default function Page() {
  const { handleSubmit, control, register, reset, watch } = useForm();
  const [proprietarios, setProprietarios] = useState<[Owner]>();
  const [imoveis, setImoveis] = useState<[Property]>();
  const [inquilinos, setInquilinos] = useState<[Tenant]>();
  const [tipoImovel, setTipoImovel] = useState<[propertyTypes]>();
  const [item, setItem] = useState<boolean>(false);
  useEffect(() => {
    async function getItens(){
      const responseProprietarios = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/owner`);
      const responseTipoImovel = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property-type`);
      const reponseImoveis =  await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property`);
      const responseInquilinos = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/tenant`);

      if(responseProprietarios.status == 200)
        setProprietarios(responseProprietarios.data.data);
      
      if(responseTipoImovel.status == 200)
        setTipoImovel(responseTipoImovel.data.data);

      if(reponseImoveis.status == 200)
        setImoveis(reponseImoveis.data.data);
      
      if(responseInquilinos.status == 200)
        setInquilinos(responseInquilinos.data.data);
    }
    getItens();
  }, []);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    const loadData = async () => {
      const stored = localStorage.getItem(`dataLocationEdit-${id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        reset(parsed);
        setLoadedFromStorage(true);
        setHasLoaded(true);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/leases/${id}`
        );
        const leaseData = response.data as Lease;

        if(leaseData){
          reset({
            contract_number: leaseData.contract_number,
            start_date: formatDateValueInput(leaseData.start_date),
            end_date: formatDateValueInput(leaseData.end_date),
            status: leaseData.status,
            property_id: leaseData.property?.id,
            type_id: leaseData.property?.type?.id,
            owner_id: leaseData.owner?.id,
            tenant_id: leaseData.tenant?.id
          });

          const valuesLease = {
            rent_amount: leaseData.rent_amount,
            condo_fee: leaseData.condo_fee,
            property_tax: leaseData.property_tax,
            extra_charges: leaseData.extra_charges,
            agency_commission: leaseData.agency_commission,
            commission_amount: leaseData.commission_amount,
            rent_due_date: formatDateValueInput(leaseData.rent_due_date),
            tax_due_date: formatDateValueInput(leaseData.tax_due_date),
            condo_due_date: formatDateValueInput(leaseData.condo_due_date)
          }
          localStorage.setItem(`valuesLeaseEdit-${id}`, JSON.stringify(valuesLease));
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }

      setHasLoaded(true);
    };

    loadData();
  }, [id, reset]);

  const optionsProprietarios = proprietarios?.map((e) => ({
    label: e.name, value: e.id.toString()
  }))

  const optionsTiposImoveis = tipoImovel?.map((e) => ({
    label: e.description, value: e.id.toString()
  }))

  const optionsImoveis = imoveis?.map((e) => ({
    label: e.title, value: e.id.toString()
  }))

  const optionsInquilinos = inquilinos?.map((e) => ({
    label: e.name, value: e.id.toString()
  }))

  const optionsStatus = [
    { label: "Contrato Vencido", value: "EXPIRED" },
    { label: "Contrato Vencendo", value: "EXPIRING" },
    { label: "Contrato em dia   ", value: "UP_TO_DATE" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem(`dataLocationEdit-${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const watchedValues = watch();
  useEffect(() => {
    const requiredFields = [
      "contract_number",
      "start_date",
      "end_date",
      "status",
      "property_id",
      "type_id",
      "owner_id",
      "tenant_id",
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
      localStorage.setItem(`dataLocationEdit-${id}`, JSON.stringify(watchedValues));
      setItem(true);
      setSuccessMessage({
        visible: true,
        message: 'Dados da locação salvos com sucesso!'
      });
      router.push(`/dashboard/locacoes/editar/${id}/valores`);
    }
  };

  return (
    <>
      <NavigationBar
        allEnabled
        steps={[
          {
            path: `/dashboard/locacoes/editar/${id}/dados-locacoes`,
            label: "Dados Locação",
            key: "",
            icon: 0
          },
          {
            path: `/dashboard/locacoes/editar/${id}/valores`,
            label: "Valores Locação",
            key: "",
            icon: 2
          },
        ]} id={id}></NavigationBar>
      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Dados Locação"
        svg={<IconeCasa />}>
        <Controller
          name="contract_number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="contrato"
              id="contract_number"
              required
              placeHolder="Número do contrato"
              type="number"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={1}
              autoFocus
            />
          )}
        />

        <Controller
          name="start_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Data Início"
              id="start_date"
              required
              type="date"
              svg={<IconeDataCompra className="svg-darkmode-estatic" />}
              tabIndex={2}
            />
          )}
        />

        <Controller
          name="end_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Data Final"
              id="end_date"
              required
              type="date"
              svg={<IconeDataCompra className="svg-darkmode-estatic" />}
              tabIndex={3}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          defaultValue={optionsStatus?.[2]?.value}
          render={({ field }) => (
            <Select
              id="status"
              label="Status"
              required
              options={optionsStatus ?? []}
              svg={<IconeMobiliado className="svg-darkmode-estatic" />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={4}
            />
          )}
        />

        <Controller
          name="property_id"
          control={control}
          defaultValue={optionsImoveis?.[0]?.label}
          render={({ field }) => (
            <Select
              id="property_id"
              label="Nome do Imóvel"
              required
              options={optionsImoveis ?? []}
              svg={<IconeMobiliado className="svg-darkmode-estatic" />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={5}
            />
          )}
        />

        <Controller
          name="type_id"
          control={control}
          defaultValue={optionsTiposImoveis?.[0]?.value}
          render={({ field }) => (
            <Select
              id="type_id"
              label="Tipo do imóvel"
              required
              options={optionsTiposImoveis ?? []}
              svg={<IconeMobiliado className="svg-darkmode-estatic" />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={6}
            />
          )}
        />

        <Controller
          name="owner_id"
          control={control}
          defaultValue={optionsProprietarios?.[0]?.label}
          render={({ field }) => (
            <Select
              id="owner_id"
              label="Proprietário"
              required
              options={optionsProprietarios ?? []}
              svg={<IconeMobiliado className="svg-darkmode-estatic" />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={7}
            />
          )}
        />

        <Controller
          name="tenant_id"
          control={control}
          defaultValue={optionsInquilinos?.[0]?.label}
          render={({ field }) => (
            <Select
              id="tenant_id"
              label="Inquilino"
              required
              options={optionsInquilinos ?? []}
              svg={<IconeMobiliado className="svg-darkmode-estatic" />}
              onChange={field.onChange}
              defaultValue={field.value}
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
