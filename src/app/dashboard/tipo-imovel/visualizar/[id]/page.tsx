"use client";
import Form from "@/components/Ui/Form";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import IconeObservacoes from "@/../public/icons/observacoes.svg";
import axios from "axios";
import Section from "@/components/Ui/Section";
import { FaRegUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import TextArea from "@/components/Ui/TextArea";
import Link from "next/link";

export default function Page() {
  const { control, register, reset } = useForm();
  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    async function getPropertyType(){
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property-type/${id}`);
      reset({
        description: response.data.description
      });
    }

    getPropertyType();
  }, [])

  return (
    <Section
      title="Visualizar Tipo do Imóvel"
      href="/dashboard/tipo-imovel"
      hrefText="Voltar para dashboard">
      <div
        className="mt-3 bg-[#fff] dark:bg-[#12101D] p-5 rounded-xl"
        style={{ boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15)" }}>
        <Form
          className="flex flex-row flex-wrap gap-8"
          title="Dados Tipo Imóvel"
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
                disabled
                svg={<IconeObservacoes className="svg-darkmode-estatic" />}
              />
            )}
          />

          <div className="flex items-center gap-5 mt-8 border-t-2 pt-6 border-[#11111180] dark:border-[#fff] w-full justify-end">
            <Link
              href="/dashboard/tipo-imovel"
              className="flex justify-center gap-3 items-center max-w-[250px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft">
              Voltar à Dashboard
            </Link>
          </div>
        </Form>
      </div>
    </Section>
  );
}
