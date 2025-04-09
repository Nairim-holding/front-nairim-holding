'use client'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function CarrosselBanner(){
    return(

        <section>

            <div className="relative">
                <Swiper direction="vertical" loop={true} slidesPerView={1} style={{ height: '832px' }}   allowSlidePrev={false} allowSlideNext={false}  className="mySwiper">
                    <SwiperSlide style={{ height: '500px' }}>
                        <div className="flex h-full w-full">
                            <Image className="w-[60%] h-full object-cover brightness-50" src="/banners/banner1.png" alt="banner1" width={500} height={500}></Image>
                            <div className="w-full h-full bg-[#1F2633]"></div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex h-full w-full">
                            <Image className="w-[60%] h-full object-cover brightness-50" src="/banners/banner2.png" alt="banner1" width={500} height={500}></Image>
                            <div className="w-full h-full bg-[#3CABAE]"></div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex h-full w-full">
                            <Image className="w-[60%] h-full object-cover brightness-50" src="/banners/banner3.png" alt="banner1" width={500} height={500}></Image>
                            <div className="w-full h-full bg-[#C9AC99]"></div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex h-full w-full">
                            <Image className="w-[60%] h-full object-cover brightness-50" src="/banners/banner4.png" alt="banner1" width={500} height={500}></Image>
                            <div className="w-full h-full bg-[#184261]"></div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex h-full w-full">
                            <Image className="w-[60%] h-full object-cover brightness-50" src="/banners/banner5.png" alt="banner1" width={500} height={500}></Image>
                            <div className="w-full h-full bg-[#415622]"></div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="absolute top-[0px] h-full flex items-center w-full">
                    <Swiper direction="horizontal" loop={true} slidesPerView={1.2} spaceBetween={50} className="mySwiper w-full">
                        <SwiperSlide>
                            <div className="flex h-full w-full justify-end">
                                <Image className="w-[488px] h-[388px] object-cover" src="/banners/banner1.png" alt="banner1" width={488} height={388}></Image>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex h-full w-full justify-end">
                                <Image className="w-[488px] h-[388px] object-cover" src="/banners/banner2.png" alt="banner1" width={488} height={388}></Image>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex h-full w-full justify-end">
                                <Image className="w-[488px] h-[388px] object-cover" src="/banners/banner3.png" alt="banner1" width={488} height={388}></Image>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex h-full w-full justify-end">
                                <Image className="w-[488px] h-[388px] object-cover" src="/banners/banner4.png" alt="banner1" width={488} height={388}></Image>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex h-full w-full justify-end">
                                <Image className="w-[488px] h-[388px] object-cover" src="/banners/banner5.png" alt="banner1" width={488} height={388}></Image>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

        </section>

    )
}