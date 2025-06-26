'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface BrainImage {
    src: string;
    style: React.CSSProperties;
}

export default function Page() {
    const [brainImageList, setBrainImageList] = useState<BrainImage[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const brainImages = Array.from({ length: 11 }, (_, i) => `/brainrot/image${i + 1}.jpg`);
    const brainGifs = Array.from({ length: 11 }, (_, i) => `/brainrot/gif${i + 1}.gif`);

useEffect(() => {
    const startExperience = async () => {
        // Remover áudio temporariamente
        intervalRef.current = setInterval(() => {
            const useGif = Math.random() < 0.9;
            const list = useGif ? brainGifs : brainImages;
            const randIndex = Math.floor(Math.random() * list.length);

            const randomTop = Math.floor(Math.random() * 80);
            const randomLeft = Math.floor(Math.random() * 80);
            const randomSize = 200 + Math.floor(Math.random() * 300);

            const newImage: BrainImage = {
                src: list[randIndex],
                style: {
                    position: 'absolute',
                    top: `${randomTop}%`,
                    left: `${randomLeft}%`,
                    width: `${randomSize}px`,
                    height: `${randomSize}px`,
                    zIndex: 10,
                    opacity: 0.9,
                    transition: 'opacity 75ms ease-in-out',
                }
            };

            console.log("Imagem gerada:", newImage.src);
            setBrainImageList((prev) => [...prev, newImage]);
        }, 100);
    };

    startExperience();

    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
}, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black text-white">
            {/* Imagens flutuantes */}
            {brainImageList.map((img, idx) => (
                <img key={idx} src={img.src} alt="brainrot" style={img.style} />
            ))}

            <div className="relative z-20 flex flex-col items-center justify-center h-full">
                <Image 
                    src="/matheus-henrique-dos-santos-bino.png" 
                    width={500} 
                    height={500} 
                    alt="matheus henrique dos santos bino"
                    className="transcended-image"
                />
                <audio ref={audioRef} src="/carlinhos.mp3" preload="auto" />
            </div>
        </div>
    );
}
