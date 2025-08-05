"use client";
import Input from "@/components/Admin/Input";
import Select from "@/components/Admin/Select";
import TextArea from "@/components/Admin/TextArea";
import Form from "@/components/Form";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import IconeCasa from "@/../public/icons/casa.svg";
import IconeObservacoes from "@/../public/icons/observacoes.svg";
import IconeMobiliado from "@/../public/icons/mobiliado.svg";
import IconeTestada from "@/../public/icons/testada.svg";
import IconeAndares from "@/../public/icons/predio.svg";
import IconeAreaPrivativa from "@/../public/icons/area-privativa.svg";
import IconeGaragem from "@/../public/icons/garagem.svg";
import IconeBanheiro from "@/../public/icons/banheiro.svg";
import IconeQuartos from "@/../public/icons/quartos.svg";
import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import axios from "axios";
import Owner from "@/types/owner";
import propertyTypes from "@/types/propertyTypes";
import { useParams, useRouter } from "next/navigation";
import Property from "@/types/property";
import { useUIStore } from "@/stores/uiStore";

export default function Page() {
  const [proprietarios, setProprietarios] = useState<[Owner]>();
  const [tipoImovel, setTipoImovel] = useState<[propertyTypes]>();
  const {
    successMessage, setSuccessMessage,
    errorMessage, setErrorMessage,
  } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    async function getItens() {
      const responseProprietarios = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_API}/owner`
      );
      const responseTipoImovel = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_API}/property-type`
      );

      if (responseProprietarios.status == 200)
        setProprietarios(responseProprietarios.data);

      if (responseTipoImovel.status == 200)
        setTipoImovel(responseTipoImovel.data);
    }
    getItens();
  }, []);

  const { control, register, reset, watch, handleSubmit } = useForm();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    const loadData = async () => {
      const stored = localStorage.getItem(`dataPropertysEdit-${id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        reset(parsed);
        setLoadedFromStorage(true);
        setHasLoaded(true);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/property/${id}`
        );
        const propertyData = response.data as Property;

        if (propertyData) {
          reset({
            title: propertyData.title || "",
            bedrooms: propertyData.bedrooms || "",
            bathrooms: propertyData.bathrooms || "",
            half_bathrooms: propertyData.half_bathrooms || "",
            garage_spaces: propertyData.garage_spaces || "",
            area_total: propertyData.area_total || "",
            area_built: propertyData.area_built || "",
            frontage: propertyData.frontage || "",
            tax_registration: propertyData.tax_registration || "",
            owner_id: propertyData.owner_id || "",
            type_id: propertyData.type_id || "",
            furnished: propertyData.furnished ?? "",
            floor_number: propertyData.floor_number || "",
            notes: propertyData.notes || "",
          });
        }

        const address = propertyData?.addresses?.[0]?.address;
        if (address) {
          const addressValues = {
            zip_code: address.zip_code || "",
            street: address.street || "",
            number: address.number || "",
            district: address.district || "",
            city: address.city || "",
            state: address.state || "",
            country: address.country || "Brasil",
          };
          localStorage.setItem(`addressPropertyEdit-${id}`, JSON.stringify(addressValues));
        }

        const values = propertyData?.values?.[0];
        if (values) {
          const valueData = {
            purchase_value: values.purchase_value || "",
            purchase_date: values.purchase_date || "",
            property_tax: values.property_tax || "",
            rental_value: values.rental_value || "",
            condo_fee: values.condo_fee || "",
            current_status: values.current_status || "",
            sale_value: values.sale_value || "",
            sale_date: values.sale_date || "",
            extra_charges: values.extra_charges || "",
            sale_rules: values.sale_rules || "",
            lease_rules: values.lease_rules || "",
            notes: values.notes || "",
          };
          localStorage.setItem(`valuesPropertyEdit-${id}`, JSON.stringify(valueData));
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }

      setHasLoaded(true);
    };

    loadData();
  }, [id, reset]);

  const optionsProprietarios = proprietarios?.map((e) => ({
    label: e.name,
    value: e.id.toString(),
  }));

  const optionsTiposImoveis = tipoImovel?.map((e) => ({
    label: e.description,
    value: e.id.toString(),
  }));

  const optionsMobiliado = [
    { label: "Não", value: "false" },
    { label: "Sim", value: "true" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(`dataPropertysEdit-${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const requiredFields = [
    "title",
    "owner_id",
    "type_id",
    "bedrooms",
    "bathrooms",
    "half_bathrooms",
    "garage_spaces",
    "area_total",
    "area_built",
    "frontage",
    "furnished",
    "floor_number",
    "tax_registration",
  ];
  const watchedValues = watch();
  const handleSave = () => {
    const values = watchedValues;

    const allFilled = requiredFields.every((field) => {
      const value = values[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ""
      );
    });

    if (allFilled) {
      localStorage.setItem(`dataPropertysEdit-${id}`, JSON.stringify(values));
      setSuccessMessage({
        visible: true,
        message: 'Dados do imovel salvos com sucesso!'
      });
      router.push(`/dashboard/imoveis/editar/${id}/endereco`);
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
      localStorage.setItem(`dataPropertysEdit-${id}`, JSON.stringify(watchedValues));
    } else if (!loadedFromStorage) {
      localStorage.removeItem(`dataPropertysEdit-${id}`);
    }
  }, [watchedValues, hasLoaded, loadedFromStorage]);
  return (
    <>
      <NavigationBar allEnabled path="editar" id={id}></NavigationBar>
      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Dados do Imóvel"
        svg={<IconeCasa />}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Nome Fantasia"
              id="title"
              required
              placeHolder="Nome para o imóvel"
              type="text"
              svg={<IconeNomeFantasia />}
              tabIndex={1}
              autoFocus
            />
          )}
        />

        <Controller
          name="bedrooms"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Quartos"
              id="bedrooms"
              required
              placeHolder="Quantidade de quartos"
              type="number"
              svg={<IconeQuartos />}
              tabIndex={2}
            />
          )}
        />

        <Controller
          name="bathrooms"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Banheiros"
              id="bathrooms"
              required
              placeHolder="Quantidade de banheiros"
              type="number"
              svg={<IconeBanheiro />}
              tabIndex={3}
            />
          )}
        />

        <Controller
          name="half_bathrooms"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Lavabos"
              id="half_bathrooms"
              required
              placeHolder="Quantidade de Lavabos"
              type="number"
              svg={<IconeBanheiro />}
              tabIndex={4}
            />
          )}
        />

        <Controller
          name="garage_spaces"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Vagas na Garagem"
              id="garage_spaces"
              required
              placeHolder="Quantidade de vagas"
              type="number"
              svg={<IconeGaragem />}
              tabIndex={5}
            />
          )}
        />

        <Controller
          name="floor_number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Número do Andar"
              id="floor_number"
              required
              placeHolder="Quantidade de andares"
              type="number"
              svg={<IconeAndares />}
              tabIndex={6}
            />
          )}
        />

        <Controller
          name="area_total"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Área Total (m²)"
              id="area_total"
              required
              placeHolder="Tamanho total do imóvel"
              type="text"
              mask="metros2"
              svg={<IconeAreaPrivativa />}
              tabIndex={7}
            />
          )}
        />

        <Controller
          name="area_built"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Área Construída (m²)"
              id="area_built"
              required
              placeHolder="Tamanho construída do imóvel"
              type="text"
              mask="metros2"
              svg={<IconeAreaPrivativa />}
              tabIndex={8}
            />
          )}
        />

        <Controller
          name="frontage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Testada (m)"
              id="frontage"
              required
              placeHolder="Tamanho da frente do lote"
              type="text"
              mask="metros2"
              svg={<IconeTestada />}
              tabIndex={9}
            />
          )}
        />

        <Controller
          name="tax_registration"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Registro Fiscal"
              id="tax_registration"
              required
              placeHolder="Informe o número do registro fiscal"
              type="text"
              svg={<IconeTestada />}
              tabIndex={10}
            />
          )}
        />

        <Controller
          name="owner_id"
          control={control}
          defaultValue={optionsProprietarios?.[0]?.value}
          render={({ field }) => (
            <Select
              id="owner_id"
              label="Proprietário"
              required
              options={optionsProprietarios ?? []}
              svg={<IconeMobiliado />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={11}
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
              svg={<IconeMobiliado />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={12}
            />
          )}
        />

        <Controller
          name="furnished"
          control={control}
          defaultValue={optionsMobiliado[1].value}
          render={({ field }) => (
            <Select
              id="furnished"
              label="Mobiliado"
              required
              options={optionsMobiliado}
              svg={<IconeMobiliado />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={13}
            />
          )}
        />

        <TextArea
          {...register("notes")}
          label="Observações"
          id="notes"
          placeHolder="Escreva detalhes não especificados anteriormente"
          svg={<IconeObservacoes />}
          tabIndex={14}
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
