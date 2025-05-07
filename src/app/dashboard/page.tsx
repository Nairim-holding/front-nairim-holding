'use client'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { token } from '@/types/token';
import Aside from '@/components/Admin/Aside';

export default function Page(){
    const [name, setName] = useState<string>(' matheus henrique dos santos bino ');
    
    useEffect(() => {
        const cookie = Cookies.get('authToken') as string;
        const token = jwt.decode(cookie) as token;
        setName(token?.name)
    }, [])

    return(
        <Aside></Aside>
    )
}