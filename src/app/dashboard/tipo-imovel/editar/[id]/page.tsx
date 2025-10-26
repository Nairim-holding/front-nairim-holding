"use client";
import Form from "@/components/Ui/Form";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import IconeObservacoes from "@/../public/icons/observacoes.svg";
import axios from "axios";
import Section from "@/components/Ui/Section";
import { FaRegUserCircle } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import TextArea from "@/components/Ui/TextArea";
import NavigationButtons from "@/components/Admin/NavigationButtons";
import { useUIStore } from "@/stores/uiStore";

export default function Page() {
  const { control, register, reset, handleSubmit } = useForm();
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useUIStore();
  useEffect(() => {
    async function getPropertyType(){
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property-type/${id}`);
      reset({
        description: response.data.description
      });
    }

    getPropertyType();
  }, []);

  async function submitData(data:FieldValues){
    setLoading(true);
    try{
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/property-type/${id}`, data);
      if (response.status == 200){
        setSuccessMessage({
          visible: true,
          message: response.data.message || "O tipo do imóvel foi editado com sucesso!",
        });
        router.push('/dashboard/tipo-imovel');
      }
    } catch (error){
      console.error("Erro ao editar o tipo do imóvel:", error);
      setErrorMessage({
        visible: true,
        message: "Erro ao editar o tipo do imóvel",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      title="Editar Tipo do Imóvel"
      href="/dashboard/tipo-imovel"
      hrefText="Voltar">
      <div
        className="mt-3 bg-[#fff] p-5 rounded-xl"
        style={{ boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15)" }}>
        <Form
          className="flex flex-row flex-wrap gap-8"
          title="Dados Tipo Imóvel"
          onSubmit={handleSubmit(submitData)}
          svg={<FaRegUserCircle />}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea
                {...register("description")}
                placeHolder="Descrição do tipo do imóvel"
                label="Descrição do tipo do imóvel"
                id="description"
                svg={<IconeObservacoes className="svg-darkmode-estatic" />}
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
      </div>
    </Section>
  );
}
