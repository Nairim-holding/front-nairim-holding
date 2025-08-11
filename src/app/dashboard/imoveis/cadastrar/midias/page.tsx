"use client";
import InputFile from "@/components/Ui/InputFile";
import NavigationButtons from "@/components/Admin/NavigationButtons";
import Form from "@/components/Ui/Form";
import NavigationBar from "@/components/Admin/NavigationBar";

import IconeMideas from "@/../public/icons/mideas.svg";
import IconeDocumento from "@/../public/icons/documento.svg";

import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/uiStore";

import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { token } from "@/types/token";

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
  const { handleSubmit, control, reset, watch } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const restoredData: Record<string, File[]> = {};

      for (const key of Object.keys(parsed)) {
        restoredData[key] = parsed[key]
          .filter((file: FileStorageData) => typeof file.base64 === 'string' && file.base64.includes(','))
          .map((file: FileStorageData) =>
            base64ToFile(file.base64, file.name, file.type)
          );
      }

      reset(restoredData);
    }
  }, [reset]);

  useEffect(() => {
    if (isSubmitting) return;

    const subscription = watch(async (data) => {
      const convertToStorageFormat = async (files: File[] | FileList | null) => {
        const arr = files instanceof FileList ? Array.from(files) : Array.isArray(files) ? files : [];
        return await Promise.all(
          arr.map(async (file) => ({
            name: file.name,
            type: file.type,
            base64: await fileToBase64(file),
          }))
        );
      };

      const result: Record<string, FileStorageData[]> = {};
      for (const key of Object.keys(data)) {
        result[key] = await convertToStorageFormat(data[key]);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    });

    return () => subscription.unsubscribe();
  }, [watch, isSubmitting]);

  const cookie = Cookies.get('authToken') as string;
  const token = jwt.decode(cookie) as token;

  async function submitData(data: FieldValues) {
    const userId = token?.id;
    setIsSubmitting(true);
    setLoading(true);
    const dataPropertys = localStorage.getItem('dataPropertys');
    const addressProperty = localStorage.getItem('addressProperty');
    const valuesProperty = localStorage.getItem('valuesProperty');

    try {
      const createResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/property`,
        {
          dataPropertys,
          addressProperty,
          valuesProperty,
        }
      );

      const createdProperty = createResponse.data;
      const propertyId = createdProperty.id;

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        const files = value instanceof FileList ? Array.from(value) : Array.isArray(value) ? value : [];
        files.forEach((file: File) => {
          formData.append(key, file, file.name);
        });
      });
      formData.append("userId", String(userId));

      if (
        formData.has("arquivosImagens") ||
        formData.has("arquivosMatricula") ||
        formData.has("arquivosEscritura")
      ) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_URL_API}/property/${propertyId}/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      localStorage.clear();
      reset();
      router.push("/dashboard/imoveis");
      setSuccessMessage({
        visible: true,
        message: createdProperty.message || "O imóvel foi criado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao criar imóvel:", error);
      setErrorMessage({
        visible: true,
        message: "Erro ao criar imóvel ou enviar mídias",
      });
      setIsSubmitting(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavigationBar path="cadastrar" />
      <Form title="Mídias" svg={<IconeMideas />} onSubmit={handleSubmit(submitData)}>
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
                  svg={<IconeDocumento />}
                />
              )}
            />
          ))}
        </div>

        <NavigationButtons
          submitButton
          textSubmitButton="Cadastrar"
          svg={
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 15H11.5V11H15.5V9H11.5V5H9.5V9H5.5V11H9.5V15ZM10.5 20C9.11667 20 7.81667 19.7375 6.6 19.2125C5.38333 18.6875 4.325 17.975 3.425 17.075C2.525 16.175 1.8125 15.1167 1.2875 13.9C0.7625 12.6833 0.5 11.3833 0.5 10C0.5 8.61667 0.7625 7.31667 1.2875 6.1C1.8125 4.88333 2.525 3.825 3.425 2.925C4.325 2.025 5.38333 1.3125 6.6 0.7875C7.81667 0.2625 9.11667 0 10.5 0C11.8833 0 13.1833 0.2625 14.4 0.7875C15.6167 1.3125 16.675 2.025 17.575 2.925C18.475 3.825 19.1875 4.88333 19.7125 6.1C20.2375 7.31667 20.5 8.61667 20.5 10C20.5 11.3833 20.2375 12.6833 19.7125 13.9C19.1875 15.1167 18.475 16.175 17.575 17.075C16.675 17.975 15.6167 18.6875 14.4 19.2125C13.1833 19.7375 11.8833 20 10.5 20ZM10.5 18C12.7333 18 14.625 17.225 16.175 15.675C17.725 14.125 18.5 12.2333 18.5 10C18.5 7.76667 17.725 5.875 16.175 4.325C14.625 2.775 12.7333 2 10.5 2C8.26667 2 6.375 2.775 4.825 4.325C3.275 5.875 2.5 7.76667 2.5 10C2.5 12.2333 3.275 14.125 4.825 15.675C6.375 17.225 8.26667 18 10.5 18Z" fill="#F0F0F0" />
            </svg>
          }
          loading={loading}
          textLoading="Cadastrando..."
        />
      </Form>
    </>
  );
}
