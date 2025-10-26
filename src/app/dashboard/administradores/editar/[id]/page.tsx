"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import axios from "axios";
import Section from "@/components/Ui/Section";
import { FaRegUserCircle } from "react-icons/fa";
import IconEmail from "@/components/Icons/IconEmail";
import IconCalendar from "@/components/Icons/IconCalendar";
import { useParams, useRouter } from "next/navigation";
import User from "@/types/user";
import IconSex from "@/components/Icons/IconSex";
import formatDateValueInput from "@/utils/formatDateValueInput";
import Select from "@/components/Ui/Select";
import { useUIStore } from "@/stores/uiStore";
import NavigationButtons from "@/components/Admin/NavigationButtons";

export default function Page() {
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState<User>();
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useUIStore();
  const { control, reset, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getUserById() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_API}/users/${id}`
      );
      const userData = response.data as User;
      setData(userData);
      reset({
        name: userData.name || "",
        email: userData.email || "",
        birth_date: formatDateValueInput(userData.birth_date) || "",
        gender: userData.gender || "",
        password: userData.password || "",
        password_confirm: userData.password || "",
      });
    }

    getUserById();
  }, [id, reset]);

  const router = useRouter();
  async function submitData(data: FieldValues) {
    setLoading(true);
    try{
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/users/${id}`, data);
      if(response.status == 200){
        setSuccessMessage({
          visible: true,
          message: response.data.message || "O administrador foi editado com sucesso!",
        });
        router.push('/dashboard/administradores');
      }
    } catch(error){
        console.error("Erro ao editar o administrador:", error);
        setErrorMessage({
          visible: true,
          message: "Erro ao editar o administrador",
        });
    } finally{
      setLoading(false);
    }

  }

  const optionsGender = [
    { label: "Masculino", value: "MALE" },
    { label: "Feminino", value: "FEMALE" },
  ];
  return (
    <Section
      title="Editar Administrador"
      href="/dashboard/administradores"
      hrefText="Voltar">
      <div
        className="mt-3 bg-[#fff] p-5 rounded-xl"
        style={{ boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15)" }}>
        <Form
          className="flex flex-row flex-wrap gap-8"
          title="Dados do Administrador"
          onSubmit={handleSubmit(submitData)}
          svg={<FaRegUserCircle />}>
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
                placeHolder="Nome do Administrador"
                type="text"
                svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
                tabIndex={1}
                autoFocus
              />
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
                tabIndex={2}
              />
            )}
          />

          <Controller
            name="birth_date"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Data de nascimento"
                id="birth_date"
                required
                type="date"
                svg={<IconCalendar size={20} color="#666" />}
                tabIndex={3}
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Select
                id="gender"
                label="Sexo"
                required
                options={optionsGender ?? []}
                svg={<IconSex size={20} color="#666" />}
                onChange={field.onChange}
                defaultValue={field.value}
                tabIndex={4}
              />
                )}
          />

          {/* <div className="w-full flex justify-start mt-4 flex-row gap-8">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="relative min-w-[250px]">
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    label="Senha"
                    placeHolder="Insira a senha"
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    password
                    svg={<IconPassword size={20} color="#666" />}
                    tabIndex={5}
  
                  />
                  <button
                    className="absolute bottom-[9px] right-2 outline-none"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}>
                    <IconPasswordHiddenShow
                      size={20}
                      color="#666"
                      hidden={showPassword}
                    />
                  </button>
                </div>
              )}
            />

            <Controller
              name="password_confirm"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="relative min-w-[250px]">
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeHolder="Confirme sua senha"
                    label="Confirmar senha"
                    id="password_confirm"
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    password
                    svg={<IconPassword size={20} color="#666" />}
                    tabIndex={6}
  
                  />
                  <button
                    className="absolute bottom-[9px] right-2 outline-none"
                    type="button"
                    onClick={() => setConfirmPassword((prev) => !prev)}>
                    <IconPasswordHiddenShow
                      size={20}
                      color="#666"
                      hidden={showConfirmPassword}
                    />
                  </button>
                </div>
              )}
            />
          </div> */}

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
