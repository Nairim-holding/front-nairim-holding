"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";

import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import formatDateValueInput from "@/utils/formatDateValueInput";
import IconTelephone from "@/components/Icons/IconTelephone";
import IconPhone from "@/components/Icons/IconPhone";
import IconEmail from "@/components/Icons/IconEmail";
import Link from "next/link";
import Agency from "@/types/agency";
import NavigationButtons from "@/components/Admin/NavigationButtons";
import { useUIStore } from "@/stores/uiStore";

export default function Page(){
    const { control, reset, register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const id = params?.id;
    const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } = useUIStore();
    const router = useRouter();
    useEffect(() => {
      async function getAgencyById() {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/agency/${id}`);
        const agencyData = response.data as Agency;

        reset({
          contact: agencyData.contacts?.[0].contact.contact || '',
          telephone: agencyData.contacts?.[0].contact.telephone || '',
          phone: agencyData.contacts?.[0].contact.phone || '',
          email: agencyData.contacts?.[0].contact.email || '',
        });
      }

      getAgencyById();
    }, []);

    async function submitData(data: FieldValues){
      setLoading(true);
      try{
        const dataAgency = localStorage.getItem(`dataAgencyEdit-${id}`);
        const dataAgencyAddress = localStorage.getItem(`addressAgencyEdit-${id}`);

        if(dataAgency && dataAgencyAddress){
          const dataAgencyParse = JSON.parse(dataAgency);
          const dataAgencyAddressParse = JSON.parse(dataAgencyAddress);
          const dataSubmit = {
            ...dataAgencyParse,
            addresses: [dataAgencyAddressParse],
            contacts: [data]
          };
          const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/agency/${id}`, dataSubmit);

          if(response.status == 200){
            setSuccessMessage({
              visible: true,
              message: response.data.message || "A imobiliária foi criada com sucesso!",
            });
            router.push('/dashboard/imobiliarias');
            localStorage.clear();
            reset();
          }
        }
      } catch (error){
        console.error("Erro ao editar imobiliária:", error);
        setErrorMessage({
          visible: true,
          message: "Erro ao editar a imobiliária",
        });
      } finally{
        setLoading(false);
      }
    }
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
        title="Contato"
        onSubmit={handleSubmit(submitData)}
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
              mask="telefone"
              required
              placeHolder="Telefone com DDD"
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
              mask="telefone"
              placeHolder="Celular com DDD"
              type="text"
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
              placeHolder="email@exemplo.com"
              type="email"
              svg={<IconEmail size={20} color="#666"></IconEmail>}
              tabIndex={4}
            />
          )}
        />

        <NavigationButtons
          submitButton
          textSubmitButton="Editar"
          svg={
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 16.5H3.425L13.2 6.725L11.775 5.3L2 15.075V16.5ZM0 18.5V14.25L13.2 1.075C13.4 0.891667 13.6208 0.75 13.8625 0.65C14.1042 0.55 14.3583 0.5 14.625 0.5C14.8917 0.5 15.15 0.55 15.4 0.65C15.65 0.75 15.8667 0.9 16.05 1.1L17.425 2.5C17.625 2.68333 17.7708 2.9 17.8625 3.15C17.9542 3.4 18 3.65 18 3.9C18 4.16667 17.9542 4.42083 17.8625 4.6625C17.7708 4.90417 17.625 5.125 17.425 5.325L4.25 18.5H0ZM12.475 6.025L11.775 5.3L13.2 6.725L12.475 6.025Z"
                fill="#F0F0F0"
              />
            </svg>
          }
          loading={loading}
          textLoading="Editando..."
        />
      </Form>
    </>
    );
}