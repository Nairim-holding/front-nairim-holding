"use client";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Property from "@/types/property";

export default function CarrosselBanner({
  propertys,
}: {
  propertys: Property[];
}) {
  const [horizontalSwiper, setHorizontalSwiper] = useState<SwiperType | null>(
    null
  );
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
        <Swiper
          direction="vertical"
          loop={true}
          slidesPerView={1}
          style={{ height: "100vh", touchAction: "auto" }}
          onSwiper={(swiper) => setVerticalSwiper(swiper)}
          className="mySwiper"
          allowTouchMove={false}
          simulateTouch={false}
          touchStartPreventDefault={false}
          grabCursor={false}>
          {propertys.map((property, i) => (
            <SwiperSlide key={i}>
              <div className="flex h-full w-full tablet:flex-col">
                <div className="w-[100%] relative tablet:h-[65%]">
                  <Image
                    className="w-full h-full object-cover brightness-50"
                    src={
                      property?.documents?.length &&
                      property.documents[0]?.file_path
                        ? property.documents[0].file_path
                        : "/banners/banner5.png"
                    }
                    alt={property.title}
                    title={property.title}
                    fill
                  />
                  <div className="absolute inset-px text-white flex justify-center items-start flex-col px-16 tablet:justify-start mobile:px-5">
                    {/* <div className="flex w-full text-[16px] font-medium py-5 gap-2 italic tablet:text-[14px]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          opacity="0.4"
                          d="M20.6191 8.45C19.5691 3.83 15.5391 1.75 11.9991 1.75C11.9991 1.75 11.9991 1.75 11.9891 1.75C8.45912 1.75 4.41912 3.82 3.36912 8.44C2.19912 13.6 5.35912 17.97 8.21912 20.72C9.27912 21.74 10.6391 22.25 11.9991 22.25C13.3591 22.25 14.7191 21.74 15.7691 20.72C18.6291 17.97 21.7891 13.61 20.6191 8.45Z"
                          fill="white"
                        />
                        <path
                          d="M11.9996 13.46C13.7393 13.46 15.1496 12.0497 15.1496 10.31C15.1496 8.57031 13.7393 7.16 11.9996 7.16C10.2599 7.16 8.84961 8.57031 8.84961 10.31C8.84961 12.0497 10.2599 13.46 11.9996 13.46Z"
                          fill="white"
                        />
                      </svg>
                      {property.addresses?.[0]
                        ? `${property.addresses[0].address.street} ${property.addresses[0].address.number}, ${property.addresses[0].address.district} - ${property.addresses[0].address.city}`
                        : ""}
                    </div> */}
                    <h1 className="text-[60px] font-bold w-full text-start leading-[60px] mb-5 font-bebasNeue tablet:text-[30px] tablet:m-0 mobile:leading-[30px]">
                      {property.title}
                    </h1>
                    {/* <p className="italic opacity-70 font-normal mb-5 tablet:text-[14px] tablet:m-0 text-start w-full">
                      {property.type?.description ?? ""}
                    </p> */}
                    <Link
                      href="#"
                      className="mt-2 text-[24px] leading-[60px] flex items-center justify-center font-normal font-bebasNeue bg-[rgba(255,255,255,0.3)] pointer max-w-[230px] w-full rounded-full tablet:mt-3 tablet:leading-[30px] tablet:text-[16px] tablet:max-w-[170px]">
                      ver imóvel
                    </Link>
                  </div>
                </div>
                <div className="w-full h-full bg-[#1F2633] tablet:h-[50%]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-0 h-full w-full flex flex-col items-center justify-center tablet:flex-row tablet:mt-[75px]">
          <Swiper
            direction="horizontal"
            loop={true}
            slidesPerView={1.2}
            spaceBetween={50}
            modules={[Pagination]}
            allowTouchMove={false}
            simulateTouch={false}
            touchStartPreventDefault={false}
            grabCursor={false}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              770: {
                slidesPerView: 1.2,
              },
            }}
            pagination={{
              type: "custom",
              el: ".custom-pagination",
              renderCustom: (swiper, current, total) => {
                return `
                  <div class="flex items-center gap-2 font-bold text-white">
                    <span>${current <= 9 ? `0${current}` : current}</span>
                    <span class="text-opacity-50">-</span>
                    <span>${total <= 9 ? `0${total}` : total}</span>
                  </div>
                `;
              },
            }}
            onSwiper={(swiper) => setHorizontalSwiper(swiper)}
            className="w-full">
            {propertys.map((property, i) => (
              <SwiperSlide key={i}>
                <div className="flex h-full w-full justify-end tablet:items-end tablet:justify-center">
                  <Image
                    className="w-[488px] h-[388px] tablet:w-[288px] tablet:h-[188px] object-cover rounded-3xl"
                    src={
                      property?.documents?.length &&
                      property.documents[0]?.file_path
                        ? property.documents[0].file_path
                        : "/banners/banner5.png"
                    }
                    alt={property.title}
                    title={property.title}
                    width={488}
                    height={388}
                    loading="lazy"
                    sizes="(max-width: 768px) 200px, 200px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex gap-5 z-[100] mt-8 relative left-[16%] tablet:w-full tablet:left-[0] tablet:justify-center">
            <button
              onClick={handlePrev}
              className="w-[50px] h-[50px] rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all">
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
              className="w-[50px] h-[50px] rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all">
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

            <div className="custom-pagination flex justify-center gap-2 mt-4 z-[100]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
