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

export default function Page() {
  const [proprietarios, setProprietarios] = useState<[Owner]>();
  const [tipoImovel, setTipoImovel] = useState<[propertyTypes]>();
  const [item, setItem] = useState<boolean>(false);
  useEffect(() => {
    async function getItens(){
      const responseProprietarios = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/owner`);
      const responseTipoImovel = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property-type`);

      if(responseProprietarios.status == 200)
        setProprietarios(responseProprietarios.data)
      
      if(responseTipoImovel.status == 200)
        setTipoImovel(responseTipoImovel.data)
    }
    getItens();
  }, []);

  const { handleSubmit, control, register, reset, watch } = useForm();

  const optionsProprietarios = proprietarios?.map((e) => ({
    label: e.name, value: e.id.toString()
  }))

  const optionsTiposImoveis = tipoImovel?.map((e) => ({
    label: e.description, value: e.id.toString()
  }))

  const optionsMobiliado = [
    { label: "Não", value: "false" },
    { label: "Sim", value: "true" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("dataPropertys");
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const watchedValues = watch();
  useEffect(() => {
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

    const allFilled = requiredFields.every((field) => {
      const value = watchedValues[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ""
      );
    });

    setIsFormComplete(allFilled);
  }, [watchedValues]);

  useEffect(() => {
    if (isFormComplete) {
      localStorage.setItem("dataPropertys", JSON.stringify(watchedValues));
      setItem(true)
    }


    if (!isFormComplete){
      localStorage.removeItem("dataPropertys");
      setItem(false);
    }
  }, [isFormComplete, watchedValues]);
  return (
    <>
      <NavigationBar formComplete={item}></NavigationBar>
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
              mask="metros"
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

      </Form>
    </>
  );
}
