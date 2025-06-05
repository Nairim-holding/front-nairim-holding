'use client'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { token } from '@/types/token';
import Aside from '@/components/Admin/Aside';

export default function Page({ children }: {children: React.ReactNode}){
    const [name, setName] = useState<string>();
    const [darkMode, setDarkMode] = useState<boolean>(false);
    
    useEffect(() => {
        const cookie = Cookies.get('authToken') as string;
        const token = jwt.decode(cookie) as token;
        setName(token?.name);
    }, []);

    return(
        <>
            <Aside darkMode={darkMode} setDarkMode={setDarkMode} userName={name} ></Aside>
            <main className="main-dashboard">
                {children}
            </main>
        </>
    )
}