'use client';
import InputFile from "@/components/Admin/InputFile";
import NavigationButtons from "@/components/Admin/NavigationButtons";
import Form from "@/components/Form";
import NavigationBar from "@/components/Admin/NavigationBar";

import IconeMideas from "@/../public/icons/mideas.svg";
import IconeDocumento from "@/../public/icons/documento.svg";

import { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useUIStore } from "@/stores/uiStore";
import Link from "next/link";

// Utilitários
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const base64ToFile = (base64: string, name: string, mimeType: string): File => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], name, { type: mimeType });
};

interface FileStorageData {
  name: string;
  type: string;
  base64: string;
}

const STORAGE_KEY = 'midiasProperty';

export default function Page() {
  const {
    successMessage, setSuccessMessage,
    errorMessage, setErrorMessage,
  } = useUIStore();
  const { control } = useForm();
  const router = useRouter();

    const params = useParams();
    const id = params?.id;
  return (
    <>
      <NavigationBar path="visualizar" allEnabled id={id}/>
      <Form title="Mídias" svg={<IconeMideas />}>
        <Controller
          name="arquivosImagens"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <InputFile
              label="Imagens"
              accept=".png,.jpg"
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
          <Link href={'/dashboard/imoveis'} className="flex justify-center gap-3 items-center max-w-[250px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft">Voltar a Dashboard</Link>
        </div>
      
      </Form>
    </>
  );
}
 
