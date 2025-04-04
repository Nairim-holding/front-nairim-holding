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
        const name = formData.get('name');


        const response = axios.post('http://localhost:5000/users', {
            name,
            email,
            password
        });
        console.log((await response).data);
    }
    return(
        <section>
            <h2 className="text-center">Cadastre-se</h2>
            <form className="flex flex-col gap-3 items-center" onSubmit={onSubmit}>
                <input type="email" placeholder="Digite o seu email:" name="email" className="text-black border px-5 py-2 border-black outline-none"></input>
                <input type="password" placeholder="Digite a sua senha: " name="password" className="text-black border px-5 py-2 border-black outline-none"></input>
                <input type="text" placeholder="Digite o seu nome: " name="name" className="text-black border px-5 py-2 border-black outline-none"></input>
                <button type="submit" className="border border-black p-2 px-4 mb-4">Cadatre-se</button>
            </form>

            <Link href={'/login'} className="text-center w-full block">Logar-se</Link>
        </section>
    )
}