"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import IconeNomeFantasia from "@/../public/icons/nome-fantasia.svg";
import axios from "axios";
import Section from "@/components/Ui/Section";
import { FaRegUserCircle } from "react-icons/fa";
import IconEmail from "@/components/Icons/IconEmail";
import IconCalendar from "@/components/Icons/IconCalendar";
import { useParams } from "next/navigation";
import Link from "next/link";
import User from "@/types/user";
import IconSex from "@/components/Icons/IconSex";
import formatDateValueInput from "@/utils/formatDateValueInput";

export default function Page() {
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState<User>();

  const { control, reset } = useForm();

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
        gender:
        userData.gender === "MALE"
          ? "Homem"
          : userData.gender === "FEMALE"
          ? "Mulher"
          : userData.gender === "OTHER"
          && "Outro" || "",
        password: userData.password || "",
        password_confirm: userData.password || "",
      });
    }

    getUserById();
  }, [id, reset]);
  return (
    <Section
      title="Visualizar Admnistrador"
      href="/dashboard/administradores"
      hrefText="Voltar para dashboard">
      <div
        className="mt-3 bg-[#fff] dark:bg-[#12101D] p-5 rounded-xl"
        style={{ boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15)" }}>
        <Form
          className="flex flex-row flex-wrap gap-8"
          title="Dados do Administrador"
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
                placeHolder="Nome do administrador"
                type="text"
                svg={<IconeNomeFantasia className="svg-darkmode-estatic" />}
                tabIndex={1}
                autoFocus
                disabled
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
                disabled
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
                disabled
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Sexo"
                id="gender"
                required
                type="text"
                svg={<IconSex size={20} color="#666" />}
                tabIndex={4}
                disabled
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
                    disabled
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
                    disabled
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

          <div className="flex items-center gap-5 mt-8 border-t-2 pt-6 border-[#11111180] dark:border-[#fff] w-full justify-end">
            <Link
              href="/dashboard/administradores"
              className="flex justify-center gap-3 items-center max-w-[250px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft">
              Voltar à Dashboard
            </Link>
          </div>
        </Form>
      </div>
    </Section>
  );
}
