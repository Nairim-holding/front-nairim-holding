import Image from "next/image";
import Link from "next/link";

export default function Footer(){
    const date = new Date();
    const year = date.getFullYear();
    return (
      <footer className="bg-bg_footer p-10 text-white rounded-2xl mobile:p-8 font-inter">
        <div className="flex justify-between items-center border-b-[1px] border-white border-opacity-20 pb-8 mobile:gap-4">
          <Link href="/">
            <Image
              src={"/logo-footer.svg"}
              alt="logo da nairim holding"
              width={120}
              height={60}></Image>
          </Link>

          <Link
            href="/"
            className="bg-yellow text-[14px] text-text_black font-semibold py-3 px-4 rounded-3xl text-center w-[195px] duration-300 ease-in-out border border-yellow hover:bg-transparent hover:text-yellow hover:border mobile:px-2 mobile:text-[12px]">
            Fazer um depoimento
          </Link>
        </div>

        <div className="flex flex-wrap justify-between pt-5 mobile:flex-col mobile:gap-5">
          <div className="max-w-[200px]">
            <h2 className="font-medium mb-3 text-[14px]">Endereço</h2>
            <p className="font-normal text-white text-opacity-60 text-[14px] duration-300 cursor-default hover:text-opacity-100">R. Joaquim Ramos Mendes, 323 - Cascata, Garça/SP</p>
          </div>

          <div className="max-w-[200px]">
            <h2 className="font-medium mb-3 text-[14px]">Informações</h2>
            <ul>
              <li className="font-normal text-white text-opacity-60 text-[14px] mb-2 duration-300 hover:text-opacity-100">
                <Link href="#">Imóveis</Link>
              </li>
              <li className="font-normal text-white text-opacity-60 text-[14px] mb-2 duration-300 hover:text-opacity-100">
                <Link href="#">Alugueis</Link>
              </li>
              <li className="font-normal text-white text-opacity-60 text-[14px] mb-2 duration-300 hover:text-opacity-100">
                <Link href="#">Compras</Link>
              </li>
              <li className="font-normal text-white text-opacity-60 text-[14px] mb-2 duration-300 hover:text-opacity-100">
                <Link href="#">Sobre nós</Link>
              </li>
              <li className="font-normal text-white text-opacity-60 text-[14px] mb-2 duration-300 hover:text-opacity-100">
                <Link href="#">Contato</Link>
              </li>
            </ul>
          </div>

          <div className="max-w-[200px]">
            <h2 className="font-medium mb-3 text-[14px]">Entre em contato</h2>
            <ul>
              <li className="font-normal text-white text-opacity-60 text-[14px] mb-2 duration-300 underline-effect hover:text-opacity-100">
                <Link href="#">+1 891 989-11-91</Link>
              </li>
              <li className="font-normal text-white text-opacity-60 text-[14px] mb-2 duration-300 underline-effect hover:text-opacity-100">
                <Link href="#">help@logoipsum.com</Link>
              </li>
            </ul>
          </div>

          <div className="max-w-[200px]">
            <ul className="flex gap-2 flex-wrap items-center">
              <li>
                <Link href="#" className="group w-[35px] h-[35px] flex items-center justify-center bg-white bg-opacity-20 rounded-full">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="duration-300 group-hover:scale-125">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99328 0C5.82175 0 5.54865 0 4.69603 0.0467251C3.85006 0.0867751 3.26389 0.220275 2.7643 0.420526C2.23141 0.620776 1.77846 0.901126 1.33216 1.335C0.905851 1.80225 0.632745 2.2428 0.42625 2.77013C0.226417 3.27743 0.0931946 3.86483 0.0532279 4.70588C-6.10352e-05 5.57363 -6.10352e-05 5.84063 -6.10352e-05 8.01001C-6.10352e-05 10.1794 -6.10352e-05 10.4597 0.0465668 11.3141C0.0865335 12.1619 0.219756 12.7493 0.419589 13.2499C0.619423 13.7839 0.89919 14.2311 1.33882 14.6783C1.8051 15.0922 2.25806 15.3659 2.78429 15.5728C3.29053 15.7731 3.87671 15.9066 4.71601 15.9466C5.58195 15.9933 5.8484 16 8.01992 16C10.1914 16 10.4712 16 11.3238 15.9466C12.1631 15.9066 12.7493 15.7731 13.2556 15.5728C13.7884 15.3726 14.2281 15.0922 14.6744 14.6516C15.1074 14.1977 15.3805 13.7505 15.5869 13.2232C15.7868 12.7159 15.92 12.1285 15.9533 11.2874C15.9933 10.4197 15.9999 10.1527 15.9999 7.97664C15.9999 5.80058 15.9999 5.52691 15.9533 4.67251C15.9133 3.83813 15.7801 3.25073 15.5803 2.73675C15.3805 2.20275 15.0874 1.76888 14.6477 1.32165C14.1881 0.867751 13.7551 0.600751 13.2289 0.400501C12.7227 0.20025 12.1365 0.0667501 11.2972 0.020025C10.4379 0 10.1715 0 7.99328 0ZM7.99328 1.4418C10.1248 1.4418 10.378 1.4418 11.2239 1.48853C12.0033 1.52858 12.4229 1.6554 12.7093 1.76888C13.0824 1.90238 13.3488 2.0826 13.6286 2.36963C13.9083 2.63663 14.0815 2.90363 14.2281 3.28411C14.3347 3.57113 14.4612 3.99166 14.4945 4.77263C14.5412 5.62036 14.5478 5.87401 14.5478 8.01001C14.5478 10.146 14.5478 10.3997 14.5012 11.2474C14.4612 12.0284 14.3347 12.4489 14.2214 12.7359C14.0882 13.1097 13.9083 13.3767 13.6219 13.6571C13.3555 13.9374 13.089 14.111 12.7093 14.2578C12.4229 14.3646 12.0033 14.4914 11.2239 14.5248C10.378 14.5715 10.1248 14.5782 7.99328 14.5782C5.86172 14.5782 5.6086 14.5782 4.76264 14.5315C3.98329 14.4914 3.56364 14.3646 3.27721 14.2511C2.90419 14.1176 2.63774 13.9374 2.35797 13.6504C2.07821 13.3834 1.90502 13.1164 1.75847 12.7359C1.6519 12.4489 1.52533 12.0284 1.49203 11.2474C1.4454 10.3997 1.43874 10.146 1.43874 8.01001C1.43874 5.87401 1.43874 5.62036 1.48537 4.77263C1.52533 3.99166 1.6519 3.57113 1.76513 3.28411C1.89836 2.9103 2.07821 2.6433 2.36463 2.36295C2.63108 2.0826 2.89752 1.90905 3.27721 1.7622C3.56364 1.6554 3.98329 1.52858 4.76264 1.4952C5.6086 1.44848 5.86172 1.4418 7.99328 1.4418ZM3.89003 8.01001C3.89003 5.74051 5.7285 3.89821 7.99328 3.89821C10.2581 3.89821 12.0965 5.74051 12.0965 8.01001C12.0965 10.2795 10.2581 12.1218 7.99328 12.1218C5.7285 12.1218 3.89003 10.2795 3.89003 8.01001ZM7.99328 10.68C6.52783 10.68 5.32883 9.47851 5.32883 8.01001C5.32883 6.54151 6.52783 5.34001 7.99328 5.34001C9.45872 5.34001 10.6577 6.54151 10.6577 8.01001C10.6577 9.47851 9.45872 10.68 7.99328 10.68ZM12.2631 4.69253C12.7893 4.69253 13.2223 4.27201 13.2223 3.73801L13.2556 3.70463C13.2556 3.1773 12.8226 2.74343 12.2897 2.74343C11.7568 2.74343 11.3305 3.19733 11.3305 3.73133C11.3305 4.26533 11.7302 4.69253 12.2631 4.69253Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#" className="group w-[35px] h-[35px] flex items-center justify-center bg-white bg-opacity-20 rounded-full">
                  <svg
                    width="8"
                    height="16"
                    viewBox="0 0 8 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="duration-300 group-hover:scale-125">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.34278 5.33333V3.2C2.34278 3.19313 2.34276 3.18553 2.34274 3.17723C2.34149 2.70855 2.33428 0 5.62907 0H7.99993V3.2H5.94278C5.80191 3.18262 5.66114 3.2332 5.56083 3.33723C5.46051 3.44126 5.41174 3.58725 5.4285 3.73333V5.33333H7.99993L7.48564 8.53333H5.4285V16H2.34278V8.53333H0.799927V5.33333H2.34278Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#" className="group w-[35px] h-[35px] flex items-center justify-center bg-white bg-opacity-20 rounded-full">
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="duration-300 group-hover:scale-125">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.05022 10.1629V4.42508L13.0189 7.29413L8.05022 10.1629ZM19.1259 2.69049C18.906 1.86775 18.258 1.2196 17.4351 0.999662C15.9436 0.600098 9.96271 0.600098 9.96271 0.600098C9.96271 0.600098 3.982 0.600098 2.49048 0.999662C1.66758 1.2196 1.01959 1.86775 0.799654 2.69049C0.399933 4.18216 0.399933 7.29398 0.399933 7.29398C0.399933 7.29398 0.399933 10.4059 0.799654 11.8975C1.01959 12.7202 1.66758 13.3685 2.49048 13.5883C3.982 13.988 9.96271 13.988 9.96271 13.988C9.96271 13.988 15.9436 13.988 17.4351 13.5883C18.258 13.3685 18.906 12.7202 19.1259 11.8975C19.5256 10.4059 19.5256 7.29398 19.5256 7.29398C19.5256 7.29398 19.5256 4.18216 19.1259 2.69049Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex mt-[100px] mobile:mt-[50px] justify-between max-w-[390px]">
            <p className="font-normal text-white text-opacity-60 text-[12px] duration-300 hover:text-opacity-100 cursor-default">© {year} — Copyright</p>
            <p className="font-normal text-white text-opacity-60 text-[12px] duration-300 hover:text-opacity-100 cursor-default">Certificate</p>
        </div>
      </footer>
    );
}