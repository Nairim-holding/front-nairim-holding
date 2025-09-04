"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useEffect, useState } from "react";
import { Controller, FieldValue, FieldValues, useForm } from "react-hook-form";
import { useUIStore } from "@/stores/uiStore";
import { useRouter } from "next/navigation";
import IconEmail from "@/components/Icons/IconEmail";
import NavigationButtons from "@/components/Admin/NavigationButtons";
import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import IconTelephone from "@/components/Icons/IconTelephone";
import IconPhone from "@/components/Icons/IconPhone";
import axios from "axios";

export default function Page() {
  const { handleSubmit, control, register, reset, watch } = useForm();
  const [item, setItem] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("contactTenant");
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const watchedValues = watch();
  useEffect(() => {
    const requiredFields = [
      "telephone",
      "phone",
      "email",
    ];

    const allFilled = requiredFields.every((field) => {
      const value = watchedValues[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ""
      );
    });

  }, [watchedValues]);


  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } = useUIStore();
  const router = useRouter();
  async function submitData(data: FieldValues){
    setLoading(true);
    try{
      const dataTenant = localStorage.getItem('dataTenant');
      const dataTenantAddress = localStorage.getItem('addressTenant');

      if(dataTenant && dataTenantAddress){
        const dataTenantParse = JSON.parse(dataTenant);
        const dataTenantAddressParse = JSON.parse(dataTenantAddress);
        const dataSubmit = {
          ...dataTenantParse,
          addresses: [dataTenantAddressParse],
          contacts: [data]
        };
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/tenant`, dataSubmit);

        if(response.status == 200){
          setSuccessMessage({
            visible: true,
            message: response.data.message || "O inquilino foi criado com sucesso!",
          });
          router.push('/dashboard/inquilinos');
          localStorage.clear();
          reset();
        }
      }
    } catch (error){
      console.error("Erro ao criar inquilino:", error);
      setErrorMessage({
        visible: true,
        message: "Erro ao criar o inquilino",
      });
    } finally{
      setLoading(false);
    }
  }
  return (
    <>
      <NavigationBar
        formComplete={item}
        steps={[
          {
            path: `/dashboard/inquilinos/cadastrar/dados-inquilino`,
            label: "Dados do Inquilino",
            key: "dataTenant",
            icon: 0
          },
          {
            path: `/dashboard/inquilinos/cadastrar/endereco`,
            label: "Endereço",
            key: "addressTenant",
            icon: 1
          },
          {
            path: `/dashboard/inquilinos/cadastrar/contato`,
            label: "Contato",
            key: "contactTenant",
            icon: 3
          },
        ]}></NavigationBar>
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
              mask="telefone"
              id="telephone"
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
          textSubmitButton="Cadastrar"
          svg={
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.5 15H11.5V11H15.5V9H11.5V5H9.5V9H5.5V11H9.5V15ZM10.5 20C9.11667 20 7.81667 19.7375 6.6 19.2125C5.38333 18.6875 4.325 17.975 3.425 17.075C2.525 16.175 1.8125 15.1167 1.2875 13.9C0.7625 12.6833 0.5 11.3833 0.5 10C0.5 8.61667 0.7625 7.31667 1.2875 6.1C1.8125 4.88333 2.525 3.825 3.425 2.925C4.325 2.025 5.38333 1.3125 6.6 0.7875C7.81667 0.2625 9.11667 0 10.5 0C11.8833 0 13.1833 0.2625 14.4 0.7875C15.6167 1.3125 16.675 2.025 17.575 2.925C18.475 3.825 19.1875 4.88333 19.7125 6.1C20.2375 7.31667 20.5 8.61667 20.5 10C20.5 11.3833 20.2375 12.6833 19.7125 13.9C19.1875 15.1167 18.475 16.175 17.575 17.075C16.675 17.975 15.6167 18.6875 14.4 19.2125C13.1833 19.7375 11.8833 20 10.5 20ZM10.5 18C12.7333 18 14.625 17.225 16.175 15.675C17.725 14.125 18.5 12.2333 18.5 10C18.5 7.76667 17.725 5.875 16.175 4.325C14.625 2.775 12.7333 2 10.5 2C8.26667 2 6.375 2.775 4.825 4.325C3.275 5.875 2.5 7.76667 2.5 10C2.5 12.2333 3.275 14.125 4.825 15.675C6.375 17.225 8.26667 18 10.5 18Z"
                fill="#F0F0F0"
              />
            </svg>
          }
          loading={loading}
          textLoading="Cadastrando..."
        />
      </Form>
    </>
  );
}
