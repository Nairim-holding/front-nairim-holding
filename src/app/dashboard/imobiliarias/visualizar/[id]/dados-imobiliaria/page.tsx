"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";
import { Controller, useForm } from "react-hook-form";

import IconeCasa from "@/../public/icons/casa.svg";
import IconeAndares from "@/../public/icons/predio.svg";
import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import IconVerified from "@/components/Icons/IconVerified";
import Agency from "@/types/agency";

export default function Page() {
  const params = useParams();
  const id = params?.id;
  const { control, register, reset } = useForm();

useEffect(() => {
  async function getAgencyById() {
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
  }

  getAgencyById();
}, [id, reset]);

  return (
    <>
      <NavigationBar
        allEnabled
        steps={[
          {
            path: `/dashboard/imobiliarias/visualizar/${id}/dados-imobiliaria`,
            label: "Dados da imobiliária",
            key: "dataAgency",
            icon: 0
          },
          {
            path: `/dashboard/imobiliarias/visualizar/${id}/endereco`,
            label: "Endereço",
            key: "addressAgency",
            icon: 1
          },
          {
            path: `/dashboard/imobiliarias/visualizar/${id}/contato`,
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
              disabled
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
              disabled
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
              placeHolder="00.000.000/0000-00"
              type="text"
              svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
              tabIndex={3}
              disabled
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
              disabled
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
              tabIndex={5}
              disabled
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
              disabled
            />
          )}
        />
      </Form>
    </>
  );
}
