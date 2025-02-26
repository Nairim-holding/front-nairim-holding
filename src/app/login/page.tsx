'use client'
import axios from "axios";
import Link from "next/link";
import React from "react";

export default function Page(){
    async function onSubmit(e: React.FormEvent){
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email');
        const password = formData.get('password');

        const response = axios.post('http://localhost:5000/authenticate', {
            email,
            password
        });

    }
    return(
        <section>
            <h2 className="text-center">Login</h2>
            <form className="flex flex-col gap-3 items-center" onSubmit={onSubmit}>
                <input type="email" placeholder="Digite o seu email:" name="email"></input>
                <input type="password" placeholder="Digite a sua senha: " name="password"></input>
                <button type="submit" className="border p-2 px-4 mb-4">Entrar</button>
            </form>

            <Link href={'/signup'} className="text-center w-full block">Cadastre-se</Link>
        </section>
    )
}