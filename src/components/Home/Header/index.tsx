"use client";
import { useEffect, useState } from "react";
import HeaderMobile from "./mobile";
import HeaderDesktop from "./desktop";

export default function Header(){
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 650);
            const handleResize = () => setIsMobile(window?.innerWidth <= 650);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
  
    return(
        isMobile 
        ? 
        <HeaderMobile></HeaderMobile> 
        :
        <HeaderDesktop></HeaderDesktop>
    )
}