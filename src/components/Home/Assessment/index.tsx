"use client";
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Assessment(){
    return(
        <section className="px-10 py-20 bg-gradient-to-b from-[#4236C5] to-[#201A5F]">
            <h2 className="text-center text-[36px] font-semibold mb-10 text-white">O que dizem nossos clientes</h2>
            <Swiper slidesPerView={2.5} slidesPerGroup={1} spaceBetween={100}   
            breakpoints={{
                320: {
                slidesPerView: 1,
                },
                768: {
                slidesPerView: 2,
                },
                1024: {
                slidesPerView: 2.5,
                },
            }}>
                <SwiperSlide className="bg-[#fff] py-16 px-5 text-white rounded-2xl shadow-md">
                    <div className="flex gap-6 justify-center items-center">
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                    </div>
                    <p className="text-[20px] text-center py-5 text-black">“Atendimento rápido, me senti super seguro com a negociação!”</p>
                    <h3 className="text-[40px] font-semibold text-center text-[#201A60]">João Ribeiro </h3>
                </SwiperSlide>
                <SwiperSlide className="bg-[#161246] py-16 px-5 text-white rounded-2xl">
                    <div className="flex gap-6 justify-center items-center">
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                    </div>
                    <p className="text-[20px] text-center py-5 ">“Atendimento rápido, me senti super seguro com a negociação!”</p>
                    <h3 className="text-[40px] font-semibold text-center text-[#B1B2EE]">El Patrón </h3>
                </SwiperSlide>
                <SwiperSlide className="bg-[#fff] py-16 px-5 text-white rounded-2xl shadow-md">
                    <div className="flex gap-6 justify-center items-center">
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                    </div>
                    <p className="text-[20px] text-center py-5 text-black">“Atendimento rápido, me senti super seguro com a negociação!”</p>
                    <h3 className="text-[40px] font-semibold text-center text-[#201A60]"> Chico Pereira </h3>
                </SwiperSlide>
                <SwiperSlide className="bg-[#161246] py-16 px-5 text-white rounded-2xl">
                    <div className="flex gap-6 justify-center items-center">
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                        <SvgStart></SvgStart>
                    </div>
                    <p className="text-[20px] text-center py-5 ">“Atendimento rápido, me senti super seguro com a negociação!”</p>
                    <h3 className="text-[40px] font-semibold text-center text-[#B1B2EE]">Dalai Lama </h3>
                </SwiperSlide>
            </Swiper>
            <div className="mt-16 mx-auto flex items-center justify-center px-10">
                <button className="w-full max-w-[450px] h-[72px] bg-primary rounded-lg text-[24px] text-white">Fazer um depoimento</button>
            </div>
        </section>
    )
}


function SvgStart(){
    return(
        <svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_368_1497)">
            <path d="M17.0979 1.8541C17.6966 0.0114822 20.3034 0.0114799 20.9021 1.8541L23.9393 11.2016C24.2071 12.0257 24.975 12.5836 25.8414 12.5836H35.67C37.6074 12.5836 38.413 15.0628 36.8456 16.2016L28.8941 21.9787C28.1931 22.488 27.8998 23.3907 28.1675 24.2148L31.2047 33.5623C31.8034 35.4049 29.6945 36.9372 28.127 35.7984L20.1756 30.0213C19.4746 29.512 18.5254 29.512 17.8244 30.0213L9.87295 35.7984C8.30553 36.9372 6.19656 35.4049 6.79527 33.5623L9.83246 24.2148C10.1002 23.3907 9.80689 22.488 9.10592 21.9787L1.15444 16.2016C-0.412985 15.0628 0.392565 12.5836 2.33001 12.5836H12.1586C13.025 12.5836 13.7929 12.0257 14.0607 11.2016L17.0979 1.8541Z" fill="url(#paint0_linear_368_1497)"/>
            <path d="M17.5734 2.00861C18.0224 0.626645 19.9776 0.626645 20.4266 2.00861L23.4638 11.3561C23.7985 12.3862 24.7584 13.0836 25.8414 13.0836H35.67C37.1231 13.0836 37.7272 14.943 36.5517 15.7971L28.6002 21.5742C27.724 22.2108 27.3573 23.3392 27.692 24.3693L30.7292 33.7168C31.1782 35.0988 29.5965 36.248 28.4209 35.3939L20.4695 29.6168C19.5932 28.9802 18.4068 28.9802 17.5305 29.6168L9.57906 35.3939C8.40349 36.248 6.82177 35.0988 7.27079 33.7168L10.308 24.3693C10.6427 23.3392 10.276 22.2108 9.39981 21.5742L1.44834 15.7971C0.272764 14.943 0.876927 13.0836 2.33001 13.0836H12.1586C13.2416 13.0836 14.2015 12.3862 14.5362 11.3561L17.5734 2.00861Z" stroke="#543A14"/>
            </g>
            <defs>
            <filter id="filter0_d_368_1497" x="0.326172" y="0.472168" width="37.3477" height="35.7173" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_368_1497"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_368_1497" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_368_1497" x1="-11.5" y1="2.5" x2="37.8003" y2="37.885" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D99D30"/>
            <stop offset="0.524038" stopColor="#F7FF61"/>
            <stop offset="1" stopColor="#D99D30"/>
            </linearGradient>
            </defs>
        </svg>
    )
}