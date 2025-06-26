'use client'
import Image from "next/image";
import { useState, useRef } from "react";

interface BrainImage {
    src: string;
    style: React.CSSProperties;
}

export default function Page() {
    const [transcender, setTranscender] = useState(false);
    const [brainImageList, setBrainImageList] = useState<BrainImage[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const brainImages = Array.from({ length: 11 }, (_, i) => `/brainrot/image${i + 1}.jpg`);
    const brainGifs = Array.from({ length: 11 }, (_, i) => `/brainrot/gif${i + 1}.gif`);

    const handleClick = async () => {
        const nextState = !transcender;
        setTranscender(nextState);

        const elem = document.documentElement as any;
        if (nextState) {
            if (elem.requestFullscreen) await elem.requestFullscreen();
            else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
        }

        if (audioRef.current) {
            if (nextState) {
                if (!audioContextRef.current) {
                    const context = new AudioContext();
                    const source = context.createMediaElementSource(audioRef.current);
                    const gainNode = context.createGain();
                    gainNode.gain.value = 5.0;
                    source.connect(gainNode).connect(context.destination);

                    audioContextRef.current = context;
                    gainNodeRef.current = gainNode;
                    sourceRef.current = source;
                }

                if (audioContextRef.current.state === 'suspended') {
                    await audioContextRef.current.resume();
                }

                audioRef.current.currentTime = 0;
                audioRef.current.play();

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

                    setBrainImageList((prev) => [...prev, newImage]);
                }, 100);
            } else {
                audioRef.current.pause?.();
                audioRef.current.currentTime = 0;

                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }

                setBrainImageList([]);
            }
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black text-white">
            {/* Elementos visuais flutuantes (imagens + gifs) */}
            {transcender && brainImageList.map((img, idx) => (
                <img key={idx} src={img.src} alt="brainrot" style={img.style} />
            ))}

            <div className="relative z-20 flex flex-col items-center justify-center h-full">
                <Image 
                    src="/matheus-henrique-dos-santos-bino.png" 
                    width={500} 
                    height={500} 
                    alt="matheus henrique dos santos bino"
                    className={transcender ? "transcended-image" : ""}
                />

                <button 
                    className="p-5 bg-white text-black mt-5 transition-all duration-300 hover:bg-gray-300"
                    onClick={handleClick}
                >
                    {transcender ? "voltar ao mundo material" : "transcender a matéria"}
                </button>

                <audio ref={audioRef} src="/carlinhos.mp3" preload="auto" />
            </div>
        </div>
    );
}
