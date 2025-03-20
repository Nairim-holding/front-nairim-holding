'use client'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { token } from '@/types/token';

export default function Page(){
    const [name, setName] = useState<string>(' matheus henrique dos santos bino ');
    
    useEffect(() => {
        const cookie = Cookies.get('authToken') as string;
        const token = jwt.decode(cookie) as token;
        setName(token?.name)
    }, [])

    return(
        <div>
            <h1>Olá, {name}</h1>
            <h1 className="text-black text-4xl">⢀⢀⢀⢀⢀⡤⠤⠒⠒⠒⠛⠉⣉⣉⡉⠛⠒⠒⠒⠦⢤⢀⢀⢀⢀⢀⢀⢀⢀ 
⢀⢀⢀⢀⢀⢀⣧⠀⣶⣿⣿⣿⡿⠛⣿⣿⣿⣿⣿⣶⠀⣸⢀⢀⢀⢀⢀⢀⢀⢀ 
⢀⢀⢀⢀⢀⢀⢸⠀⣿⣿⣿⣯⣴⡇⣿⣿⣿⣿⣿⣿⠀⣿⢀⢀⢀⢀⢀⢀⢀⢀ 
⢀⢀⢀⢀⢀⢀⡏⢰⣿⣿⣿⣿⠿⠦⠾⡿⡿⣿⣿⣿⡆⠸⡄⢀⢀⢀⢀⢀⢀⢀ 
⡖⠦⠤⠤⠤⠖⢋⣠⣿⣿⣿⣿⣇⠤⠤⠤⠤⠀⠿⠿⠋⡈⠀⡉⠲⠤⠤⠤⠴⢶ 
⡇⢰⣶⣶⣶⣾⣿⣿⣿⣿⣏⠉⠉⠁⠁⠁⠁⠁⠁⠈⠈⠈⠈⠁⠈⠈⢀⡄⡆⢸ 
⡇⢸⣿⠿⢰⣒⠛⢿⣟⠛⠛⢒⢒⡆⠠⠄⠄⠄⠠⢀⢀⠂⠈⠈⠈⣀⣴⣿⡇⢸ 
⡇⢸⣏⢸⢘⣉⢼⣿⣿⡀⢂⠆⠆⠆⠄⠄⠆⠄⠄⠄⠄⠄⠘⣠⣾⣿⣿⣿⡇⢸ 
⡇⢸⣿⣦⢍⣉⡆⢶⣿⠇⢀⡀⢀⢀⢠⡈⢿⠏⣠⢀⢀⢀⢠⣿⣿⣿⣿⣿⡇⢸ 
⢷⠘⣿⣷⣶⣿⣿⣿⠿⢀⢀⠇⢀⢀⠸⠛⣿⡛⠻⢀⢀⢀⣸⣿⣿⣿⣿⣿⠃⡞ 
⢸⡀⣿⣿⣿⡿⠋⠁⢂⠀⠤⢀⢀⢀⢀⣈⣉⠍⡀⢀⢀⣠⣿⣿⣿⣿⣿⣿⢀⡇ 
⢀⣇⠸⠿⠋⢀⢀⠁⢀⢐⠁⣤⢔⡪⠍⣒⡞⡔⢍⣤⣾⣿⣿⣿⣿⣿⣿⠇⣸⢀ 
⢀⠘⡄⢂⢀⢀⢀⢀⢀⠀⠪⢦⣕⡢⠥⢰⢳⣾⣿⣿⣿⣿⣿⣿⣿⣿⡟⢠⠃⢀ 
⢀⢀⠹⡄⠂⢀⢀⠤⠤⣩⡶⠭⣭⠿⠯⣭⡿⠭⢽⣿⠷⣿⣿⣿⣿⠟⢠⠏⢀⢀ 
⢀⢀⢀⠘⣆⠁⡀⣠⣾⣿⣿⣿⣛⢻⠿⠿⠿⠛⣻⣿⣿⣿⣿⣿⠋⡰⠃⢀⢀⢀ 
⢀⢀⢀⢀⠈⠳⡈⠻⣿⣿⣿⣿⣿⢀⢾⣿⠏⣼⣿⣿⣿⣿⠟⢁⠞ 󠀀</h1>
        </div>
    )
}