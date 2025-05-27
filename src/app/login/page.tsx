'use client'
import responseLogin from "@/types/responseLogin";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";

// Fonte Poppins
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function Page() {
  const navigation = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/authenticate`, {
        email,
        password
      });

      const { data } = response as { data: responseLogin };
      Cookies.set('authToken', data.token, { expires: 7, path: '' });

      navigation.push('/dashboard');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Erro ao tentar fazer login. Verifique suas credenciais.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <section className={`${poppins.variable} font-poppins flex flex-col lg:flex-row h-dvh w-full bg-gradient-to-b from-cor_grad_1 via-cor_grad_2 to-cor_grad_3`}>

      {/* LOGO / CABEÇALHO */}
      <section className="w-full flex flex-col items-center justify-center text-center p-6 lg:hidden">
        <Image
          src="/logo-login.svg"
          alt="logo-nairim-old-woman-home"
          width={200}
          height={72}
          className="mb-4"
        />
        <h2 className="text-white text-2xl font-bold mb-1">Bem vindo de volta!</h2>
        <p className="text-white text-sm mb-6">Faça login</p>
      </section>

      {/* VERSÃO DESKTOP DA LOGO */}
      <section className="hidden lg:flex w-full justify-center items-center">
        <Image
          src="/logo-login.svg"
          alt="logo-nairim-old-woman-home"
          width={601}
          height={217}
          className="xl:px-10"
        />
      </section>

      {/* FORMULÁRIO */}
      <section className="flex flex-col justify-center items-center bg-white w-full px-6 sm:px-10 md:px-16 lg:px-32 xl:px-40 2xl:px-60 py-10 sm:rounded-t-3xl lg:rounded-none">

        {/* Botão Google */}
        <button className="flex items-center justify-center gap-3 border w-full max-w-md border-gray-300 rounded-lg py-2 mb-6">
          <FcGoogle size="30px" className="my-icon" />
          <span className="text-sm">Continue com o Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center w-full max-w-md mb-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">Ou login com</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {/* Formulário */}
        <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={onSubmit}>

          {/* Email input com ícone */}
          <div className="relative">
            <MdOutlineEmail className="absolute left-3 top-2.5 text-gray-400" size="20px" />
            <input
              type="email"
              name="email"
              placeholder="exemplo@gmail.com"
              className="border border-gray-300 pl-10 py-2 rounded-lg w-full"
              required
            />
          </div>

          {/* Password input com ícone + toggle */}
          <div className="relative">
            <TbLockPassword className="absolute left-3 top-2.5 text-gray-400" size="20px" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="senha"
              className="border border-gray-300 pl-10 pr-10 py-2 rounded-lg w-full"
              required
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
              onClick={togglePassword}
            >
              {showPassword ? <FaEye size="20px" /> : <FaEyeSlash size="20px" />}
            </span>
          </div>

          {/* Erro */}
          {error && (
            <div className="text-red-500 text-sm bg-red-100 border border-red-400 rounded-md px-4 py-2">
              {error}
            </div>
          )}

          <Link href="/forgot-password" className="text-sm text-center text-gray-500">
            Esqueci a senha
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-gradient-to-r from-cor_grad_1 to-cor_grad_2 text-white rounded-lg py-2 mt-2 transition-opacity ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <Link href="/signup" className="text-sm text-center text-gray-600 mt-6">
          Não tem uma conta? Cadastre-se
        </Link>
      </section>
    </section>
  );
}
