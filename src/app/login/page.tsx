'use client'
import responseLogin from "@/types/responseLogin";
import axios from "axios";
import Link from "next/link";
import React from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Page(){
    const navigation = useRouter();
    async function onSubmit(e: React.FormEvent){
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email');
        const password = formData.get('password');

        const response = axios.post('http://localhost:5000/authenticate', {
            email,
            password
        });

        const { data } = await response as {data: responseLogin};
        Cookies.set('authToken', data.token, { expires: 7, path: '' });

        navigation.push('/dashboard');
    }
    return(
        <section>
            <h2 className="text-center">Login</h2>
            <form className="flex flex-col gap-3 items-center" onSubmit={onSubmit}>
                <input type="email" placeholder="Digite o seu email:" name="email" className="text-black border px-5 py-2 border-black outline-none"></input>
                <input type="password" placeholder="Digite a sua senha: " name="password" className="text-black border px-5 py-2 border-black outline-none"></input>
                <button type="submit" className="border border-black p-2 px-4 mb-4">Entrar</button>
            </form>

            <Link href={'/signup'} className="text-center w-full block">Cadastre-se</Link>
        </section>
    )
}