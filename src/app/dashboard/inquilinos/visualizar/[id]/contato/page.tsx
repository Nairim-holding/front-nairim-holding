"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";

import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import axios from "axios";
import IconTelephone from "@/components/Icons/IconTelephone";
import IconPhone from "@/components/Icons/IconPhone";
import IconEmail from "@/components/Icons/IconEmail";
import Link from "next/link";
import Agency from "@/types/agency";

export default function Page(){
    const { control, reset, register } = useForm();

    const params = useParams();
    const id = params?.id;
    
    useEffect(() => {
      async function getTenantById() {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/tenant/${id}`);
        const tenantData = response.data as Agency;

        reset({
          contact: tenantData.contacts?.[0].contact.contact || '',
          telephone: tenantData.contacts?.[0].contact.telephone || '',
          phone: tenantData.contacts?.[0].contact.phone || '',
          email: tenantData.contacts?.[0].contact.email || '',
        });
      }

      getTenantById();
    }, []);
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
        title="Contato"
        svg={<IconTelephone color="#4236c5" size={25} />}>
        <Controller
          name="contact"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              type="text"
              tabIndex={1}
              autoFocus
              label="Contato"
              id="contact"
              placeHolder="Digite o nome do contato"
              disabled
              svg={
                <IconeNomeFantasia className="svg-darkmode-estatic" />
              }></Input>
          )}
        />

        <Controller
          name="telephone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              type="text"
              tabIndex={2}
              label="Telefone"
              id="telephone"
              required
              placeHolder="Telefone com DDD"
              disabled
              svg={
                <IconTelephone size={20} color="#666" />
              }></Input>
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Celular"
              id="phone"
              required
              placeHolder="Celular com DDD"
              type="text"
              disabled
              tabIndex={3}
              svg={<IconPhone size={20} color="#666" />}></Input>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              label="Email"
              id="email"
              required
              disabled
              placeHolder="email@exemplo.com"
              type="email"
              svg={<IconEmail size={20} color="#666"></IconEmail>}
              tabIndex={4}
            />
          )}
        />

        <div className="flex items-center gap-5 mt-8 border-t-2 pt-6 border-[#11111180] dark:border-[#fff] w-full justify-end">
          <Link
            href="/dashboard/inquilinos"
            className="flex justify-center gap-3 items-center max-w-[250px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft"
          >
            Voltar à Dashboard
          </Link>
        </div>
      </Form>
    </>
    );
}