"use client";
import Input from "@/components/Ui/Input";
import Select from "@/components/Ui/Select";
import TextArea from "@/components/Ui/TextArea";
import Form from "@/components/Ui/Form";
import { Controller, useForm } from "react-hook-form";

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
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Property from "@/types/property";

export default function Page() {
  const params = useParams();
  const id = params?.id;

  const [data, setData] = useState<Property>();

  const { control, register, reset } = useForm();

useEffect(() => {
  async function getPropertyById() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property/${id}`);
    const propertyData = response.data;
    setData(propertyData);
    reset({
      title: propertyData.title || '',
      bedrooms: propertyData.bedrooms || '',
      bathrooms: propertyData.bathrooms || '',
      half_bathrooms: propertyData.half_bathrooms || '',
      garage_spaces: propertyData.garage_spaces || '',
      area_total: propertyData.area_total || '',
      area_built: propertyData.area_built || '',
      frontage: propertyData.frontage || '',
      tax_registration: propertyData.tax_registration || '',
      owner_id: propertyData.owner_id || '',
      type_id: propertyData.type_id || '',
      furnished: propertyData.furnished ?? '',
      floor_number: propertyData.floor_number || '',
      notes: propertyData.notes || '',
    });
  }

  getPropertyById();
}, [id, reset]);

  return (
    <>
      <NavigationBar allEnabled path="visualizar" id={id}></NavigationBar>
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
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              disabled
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
              type="text"
              svg={<IconeQuartos className="svg-darkmode-estatic" />}
              disabled
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
              type="text"
              svg={<IconeBanheiro className="svg-darkmode-estatic" />}
              disabled
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
              type="text"
              svg={<IconeBanheiro className="svg-darkmode-estatic" />}
              disabled
              tabIndex={3}
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
              type="text"
              svg={<IconeGaragem className="svg-darkmode-estatic" />}
              disabled
              tabIndex={4}
            />
          )}
        />

        <Controller
          name="floor_text"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Número do Andar"
              id="floor_text"
              required
              placeHolder="Quantidade de andares"
              type="text"
              svg={<IconeAndares className="svg-darkmode-estatic" />}
              disabled
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
              svg={<IconeAreaPrivativa className="svg-darkmode-estatic" />}
              disabled
              tabIndex={5}
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
              svg={<IconeAreaPrivativa className="svg-darkmode-estatic" />}
              disabled
              tabIndex={5}
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
              svg={<IconeTestada className="svg-darkmode-estatic" />}
              disabled
              tabIndex={7}
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
              svg={<IconeTestada className="svg-darkmode-estatic" />}
              disabled
              tabIndex={7}
            />
          )}
        />

        <Controller
          name="owner_id"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <Select
              id="owner_id"
              label="Proprietário"
              required
              options={[{value: data?.owner?.name ?? '', 'label': data?.owner?.name ?? ''}]}
              svg={<IconeMobiliado className="svg-darkmode-estatic" />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={8}
              disabled
            />
          )}
        />

        <Controller
          name="type_id"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <Select
              id="type_id"
              label="Tipo do imóvel"
              required
              options={[{value: data?.type?.description ?? '', 'label': data?.type?.description ?? ''}]}
              svg={<IconeMobiliado className="svg-darkmode-estatic" />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={8}
              disabled
            />
          )}
        />

        <Controller
          name="furnished"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <Select
              id="furnished"
              label="Mobiliado"
              required
              options={[{value: data?.furnished ? 'Sim' : 'Não', 'label': data?.furnished ? 'Sim' : 'Não'}]}
              svg={<IconeMobiliado className="svg-darkmode-estatic" />}
              onChange={field.onChange}
              defaultValue={field.value}
              tabIndex={8}
              disabled
            />
          )}
        />

        <TextArea
          {...register("notes")}
          label="Observações"
          id="notes"
          placeHolder="Escreva detalhes não especificados anteriormente"
          svg={<IconeObservacoes className="svg-darkmode-estatic" />}
          tabIndex={9}
          disabled
        />

      </Form>
    </>
  );
}
