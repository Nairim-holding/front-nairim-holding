"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";
import { Controller, useForm } from "react-hook-form";

import IconeCasa from "@/../public/icons/casa.svg";
import IconeAndares from "@/../public/icons/predio.svg";
import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import Tenant from "@/types/tenant";

export default function Page() {
  const params = useParams();
  const id = params?.id;
  const { control, register, reset } = useForm();

useEffect(() => {
  async function getTenantById() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/tenant/${id}`);
    const tenantData = response.data as Tenant;
    reset({
      name: tenantData.name || '',
      internal_code: tenantData.internal_code || '',
      cnpj: tenantData.cnpj || '',
      cpf: tenantData.cpf || '',
      municipal_registration: tenantData.municipal_registration || '',
      state_registration: tenantData.state_registration || '',
      occupation: tenantData.occupation || '',
      marital_status: tenantData.marital_status || '',
    });
  }

  getTenantById();
}, [id, reset]);

  return (
    <>
      <NavigationBar
        allEnabled
        steps={[
          {
            path: `/dashboard/inquilinos/visualizar/${id}/dados-inquilino`,
            label: "Dados do Inquilino",
            key: "",
            icon: 0
          },
          {
            path: `/dashboard/inquilinos/visualizar/${id}/endereco`,
            label: "Endereço",
            key: "",
            icon: 1
          },
          {
            path: `/dashboard/inquilinos/visualizar/${id}/contato`,
            label: "Contato",
            key: "",
            icon: 3
          },
        ]}></NavigationBar>
      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Dados do inquilino"
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
              disabled
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
              disabled
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
              disabled
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
              tabIndex={5}
              disabled
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
              required
              placeHolder="Digite a inscrição municipal"
              type="text"
              svg={<IconeAndares className="svg-darkmode-estatic" />}
              tabIndex={7}
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
              required
              placeHolder="Digite a inscrição estadual"
              type="text"
              svg={<IconeAndares className="svg-darkmode-estatic" />}
              tabIndex={8}
              disabled
            />
          )}
        />
      </Form>
    </>
  );
}
