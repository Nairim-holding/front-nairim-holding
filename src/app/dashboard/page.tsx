'use client'
import Image from "next/image";
import { useState } from "react";

export default function Page(){
    const [transcender, setTranscender] = useState(false);

    return(
        <center>
            <Image 
                src="/matheus-henrique-dos-santos-bino.png" 
                width={500} 
                height={500} 
                alt="matheus henrique dos santos bino"
                className={transcender ? "transcended-image" : ""}
            />
            
            <button 
                className="p-5 bg-black text-white mt-5 transition-all duration-300"
                onClick={() => setTranscender(!transcender)}
            >
                {transcender ? "voltar ao mundo material" : "transcender a matéria"}
            </button>
        </center>
    ) 
}
