'use client';

import InputFile from "@/components/Admin/InputFile";
import Form from "@/components/Form";
import NavigationBar from "@/components/Admin/NavigationBar";
import IconeMideas from "@/../public/icons/mideas.svg";
import IconeDocumento from "@/../public/icons/documento.svg";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

async function urlToFile(url: string, fileName: string, mimeType: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, { type: mimeType });
}

export default function Page() {
  const { control, reset } = useForm();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    async function getPropertyById() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property/${id}`);
        const property = response.data;

        if (property?.documents?.length) {
          const filesByKey: Record<string, File[]> = {};

          for (const doc of property.documents) {
            if (!doc.file_path) continue;

            const fileName = doc.file_path.split("/").pop() || "arquivo";
            const file = await urlToFile(doc.file_path, fileName, doc.file_type);

            if (!filesByKey[doc.description]) {
              filesByKey[doc.description] = [];
            }
            filesByKey[doc.description].push(file);
          }

          reset(filesByKey);
        }
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
      }
    }
    getPropertyById();
  }, [id, reset]);

  return (
    <>
      <NavigationBar path="visualizar" allEnabled id={id} />
      <Form title="Mídias" svg={<IconeMideas />}>
        <Controller
          name="arquivosImagens"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <InputFile
              label="Imagens"
              accept=".png,.jpg,.jpeg"
              id="arquivosImagens"
              textButton="Selecionar Imagens"
              value={field.value}
              onChange={field.onChange}
              svg={<IconeDocumento />}
              disabled
            />
          )}
        />

        <div className="flex flex-row gap-5 flex-wrap">
          {[
            { name: "arquivosMatricula", label: "Matricula" },
            { name: "arquivosRegistro", label: "Registro" },
            { name: "arquivosEscritura", label: "Escritura" },
          ].map(({ name, label }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <InputFile
                  label={`Upload de Documentos: ${label}`}
                  accept=".pdf"
                  id={name}
                  textButton="Escolher arquivos"
                  value={field.value}
                  onChange={field.onChange}
                  disabled
                  svg={<IconeDocumento />}
                />
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-5 mt-8 border-t-2 pt-6 border-[#11111180] w-full justify-end">
          <Link
            href="/dashboard/imoveis"
            className="flex justify-center gap-3 items-center max-w-[250px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft"
          >
            Voltar à Dashboard
          </Link>
        </div>
      </Form>
    </>
  );
}
