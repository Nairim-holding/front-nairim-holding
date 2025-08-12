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
import { useParams, useRouter } from "next/navigation";
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
  const byteString = atob(base64.split(",")[1]);
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

async function urlToFile(url: string, fileName: string, mimeType: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, { type: mimeType });
}

export default function Page() {
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useUIStore();
  const { handleSubmit, control, reset, watch } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const id = params?.id;

  const STORAGE_KEY = `midiasPropertyEdit-${id}`;

  useEffect(() => {
    const loadMedia = async () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const restoredData: Record<string, File[]> = {};

        for (const key of Object.keys(parsed)) {
          restoredData[key] = parsed[key]
            .filter(
              (file: FileStorageData) =>
                typeof file.base64 === "string" && file.base64.includes(",")
            )
            .map((file: FileStorageData) =>
              base64ToFile(file.base64, file.name, file.type)
            );
        }

        reset(restoredData);
        return;
      }

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

          const forStorage: Record<string, FileStorageData[]> = {};
          for (const key in filesByKey) {
            forStorage[key] = await Promise.all(
              filesByKey[key].map(async (file) => ({
                name: file.name,
                type: file.type,
                base64: await fileToBase64(file),
              }))
            );
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(forStorage));
        }
      } catch (error) {
        console.error("Erro ao buscar mídias do imóvel:", error);
      }
    };

    loadMedia();
  }, [reset]);

  useEffect(() => {
    const subscription = watch(async (data) => {
      const convertToStorageFormat = async (
        files: File[] | FileList | null
      ) => {
        const arr =
          files instanceof FileList
            ? Array.from(files)
            : Array.isArray(files)
            ? files
            : [];
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
  }, [watch]);

  const cookie = Cookies.get('authToken') as string;
  const token = jwt.decode(cookie) as token;
  async function submitData(data: FieldValues) {
    const userId = token?.id;
    setLoading(true);
    const dataPropertys = localStorage.getItem(`dataPropertysEdit-${id}`);
    const addressProperty = localStorage.getItem(`addressPropertyEdit-${id}`);
    const valuesProperty = localStorage.getItem(`valuesPropertyEdit-${id}`);

    try {
      const updateResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_URL_API}/property/${id}`,
        {
          dataPropertys,
          addressProperty,
          valuesProperty,
        }
      );

      if (updateResponse.status === 200) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          const files =
            value instanceof FileList
              ? Array.from(value)
              : Array.isArray(value)
              ? value
              : [];
          files.forEach((file: File) => {
            formData.append(key, file, file.name);
          });
        });
        formData.append("userId", String(userId));

        await axios.put(
          `${process.env.NEXT_PUBLIC_URL_API}/property/${id}/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        localStorage.clear();
        router.push("/dashboard/imoveis");
        setSuccessMessage({
          visible: true,
          message:
            updateResponse.data.message ||
            "O imóvel foi editado com sucesso!",
        });
        reset();
      }
    } catch (error) {
      console.error("Erro ao editar imóvel ou enviar mídias:", error);
      setErrorMessage({
        visible: true,
        message: "Erro ao editar imóvel ou enviar mídias",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavigationBar allEnabled path="editar" id={id} />
      <Form
        title="Mídias"
        svg={<IconeMideas />}
        onSubmit={handleSubmit(submitData)}>
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
              svg={<IconeDocumento className="svg-darkmode-estatic" />}
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
                  svg={<IconeDocumento className="svg-darkmode-estatic" />}
                />
              )}
            />
          ))}
        </div>

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