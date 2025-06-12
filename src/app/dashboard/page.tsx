'use client'
import Image from "next/image";
import { useState, useRef } from "react";

export default function Page() {
    const [transcender, setTranscender] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    const handleClick = () => {
        const nextState = !transcender;
        setTranscender(nextState);

        if (audioRef.current) {
            if (nextState) {
                // Web Audio API setup
                if (!audioContextRef.current) {
                    const context = new AudioContext();
                    const source = context.createMediaElementSource(audioRef.current);
                    const gainNode = context.createGain();
                    gainNode.gain.value = 5.0; // 5x mais alto que o normal (pode distorcer)
                    source.connect(gainNode).connect(context.destination);

                    audioContextRef.current = context;
                    gainNodeRef.current = gainNode;
                    sourceRef.current = source;
                }

                audioRef.current.currentTime = 0;
                audioRef.current.play();
            } else {
                audioRef.current.pause?.();
                audioRef.current.currentTime = 0;
            }
        }
    };

    return (
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
                onClick={handleClick}
            >
                {transcender ? "voltar ao mundo material" : "transcender a matéria"}
            </button>

            <audio ref={audioRef} src="/carlinhos.mp3" preload="auto" />
        </center>
    );
}
