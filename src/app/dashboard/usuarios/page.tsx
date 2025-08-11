"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirm_password') as string;
        const name = formData.get('name');
        const birth_date = formData.get('birth_date'); //arrumar data-time
        const gender = formData.get('gender'); //arrumar, alterar de texto para radio, para o usuario ter escolhas ilimitadas

        if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/users`, {
                name,
                email,
                password,
                birth_date,
                gender
            });
            console.log(response.data);
            setErrorMessage('');
            // Redirecionar ou limpar o formulário, se desejar
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            setErrorMessage("Erro ao cadastrar. Tente novamente.");
        }
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 rounded-2xl ">
                <h2 className="text-center text-2xl font-semibold mb-4">Cadastre-se</h2>

                <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Digite o seu nome:"
                        name="name"
                        className="text-black border px-5 py-2 border-gray-300 rounded-md outline-none"
                        required
                    />
                    <input
                        type="date"
                        name="birth_date"
                        className="text-black border px-5 py-2 border-gray-300 rounded-md outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Digite o seu sexo:"
                        name="gender"
                        className="text-black border px-5 py-2 border-gray-300 rounded-md outline-none"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Digite o seu email:"
                        name="email"
                        className="text-black border px-5 py-2 border-gray-300 rounded-md outline-none"
                        required
                    />

                    {/* Senha */}
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite a sua senha:"
                            name="password"
                            className="text-black border px-5 py-2 border-gray-300 rounded-md outline-none w-full"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-blue-600"
                        >
                            {showPassword ? <IoEyeOffOutline /> : <FaRegEye />}
                        </button>
                    </div>

                    {/* Confirmar Senha */}
                    <div className="relative w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme a sua senha:"
                            name="confirm_password"
                            className="text-black border px-5 py-2 border-gray-300 rounded-md outline-none w-full"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-blue-600"
                        >
                            {showConfirmPassword ? <IoEyeOffOutline /> : <FaRegEye />}
                        </button>
                    </div>

                    {/* Mensagem de erro */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Cadastre-se
                    </button>
                </form>

                <Link href="/login" className="text-center block mt-4 text-blue-600 hover:underline">
                    Logar-se
                </Link>
            </div>
        </section>
    );
}
