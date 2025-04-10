'use client'
import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export default function CarrosselBanner() {
  const [horizontalSwiper, setHorizontalSwiper] = useState<SwiperType | null>(null);
  const [verticalSwiper, setVerticalSwiper] = useState<SwiperType | null>(null);

  const handleNext = () => {
    horizontalSwiper?.slideNext();
    verticalSwiper?.slideNext();
  };

  const handlePrev = () => {
    horizontalSwiper?.slidePrev();
    verticalSwiper?.slidePrev();
  };

  return (
    <section>
      <div className="relative">
        {/* Carrossel Vertical (fundo) */}
        <Swiper 
          direction="vertical" 
          loop={true} 
          slidesPerView={1}
          style={{ height: '832px' }}
          onSwiper={(swiper) => setVerticalSwiper(swiper)}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex h-full w-full">
              <Image 
                className="w-[60%] h-full object-cover brightness-50" 
                src="/banners/banner1.png" 
                alt="banner1" 
                width={500} 
                height={500}
              />
              <div className="w-full h-full bg-[#1F2633]" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-full w-full">
              <Image 
                className="w-[60%] h-full object-cover brightness-50" 
                src="/banners/banner2.png" 
                alt="banner2" 
                width={500} 
                height={500}
              />
              <div className="w-full h-full bg-[#3CABAE]" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-full w-full">
              <Image 
                className="w-[60%] h-full object-cover brightness-50" 
                src="/banners/banner3.png" 
                alt="banner3" 
                width={500} 
                height={500}
              />
              <div className="w-full h-full bg-[#C9AC99]" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-full w-full">
              <Image 
                className="w-[60%] h-full object-cover brightness-50" 
                src="/banners/banner4.png" 
                alt="banner4" 
                width={500} 
                height={500}
              />
              <div className="w-full h-full bg-[#184261]" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-full w-full">
              <Image 
                className="w-[60%] h-full object-cover brightness-50" 
                src="/banners/banner5.png" 
                alt="banner5" 
                width={500} 
                height={500}
              />
              <div className="w-full h-full bg-[#415622]" />
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Carrossel Horizontal (sobreposto) */}
        <div className="absolute top-0 h-full w-full flex flex-col items-center justify-center">
          <Swiper
            direction="horizontal"
            loop={true}
            slidesPerView={1.2}
            spaceBetween={50}
            modules={[Pagination]}
            pagination={{
              type: 'custom',
              el: '.custom-pagination',
              renderCustom: (swiper, current, total) => {
                return `
                  <div class="flex items-center gap-2 font-bold text-white">
                    <span>${current}</span>
                    <span class="text-opacity-50">-</span>
                    <span>${total}</span>
                  </div>
                `;
              }
            }}
            onSwiper={(swiper) => setHorizontalSwiper(swiper)}
            className="w-full"
          >
            <SwiperSlide>
              <div className="flex h-full w-full justify-end">
                <Image 
                  className="w-[488px] h-[388px] object-cover" 
                  src="/banners/banner1.png" 
                  alt="banner1" 
                  width={488} 
                  height={388} 
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex h-full w-full justify-end">
                <Image 
                  className="w-[488px] h-[388px] object-cover" 
                  src="/banners/banner2.png" 
                  alt="banner2" 
                  width={488} 
                  height={388} 
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex h-full w-full justify-end">
                <Image 
                  className="w-[488px] h-[388px] object-cover" 
                  src="/banners/banner3.png" 
                  alt="banner3" 
                  width={488} 
                  height={388} 
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex h-full w-full justify-end">
                <Image 
                  className="w-[488px] h-[388px] object-cover" 
                  src="/banners/banner4.png" 
                  alt="banner4" 
                  width={488} 
                  height={388} 
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex h-full w-full justify-end">
                <Image 
                  className="w-[488px] h-[388px] object-cover" 
                  src="/banners/banner5.png" 
                  alt="banner5" 
                  width={488} 
                  height={388} 
                />
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Paginação e Botões */}
          <div className="custom-pagination flex justify-center gap-2 mt-4 z-[100]"></div>
          
          <div className="flex gap-5 z-[100] mt-8">
            <button
              onClick={handlePrev}
              className="w-[50px] h-[50px] rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7.00033 12.8332L1.16699 6.99984M1.16699 6.99984L7.00033 1.1665M1.16699 6.99984H12.8337"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className="w-[50px] h-[50px] rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4.16699 9.99984H15.8337M15.8337 9.99984L10.0003 4.1665M15.8337 9.99984L10.0003 15.8332"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}