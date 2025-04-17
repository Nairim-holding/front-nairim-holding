export default function CarrosselFilter(){
    return(
        <section className="bg-[#fff] p-10">
            <div className="flex flex-wrap">
                <h1 className="w-full pb-5 text-[36px] font-bold text-[#292E3D]">Veja todos os Imóveis</h1>
                <div className="flex-[0.5] px-3">
                    <ul className="flex flex-col gap-3">
                        <li className="text-[20px] text-[#C2C7D6] font-medium">Todos</li>
                        <li className="text-[20px] text-[#C2C7D6] font-medium">Casas</li>
                        <li className="text-[20px] text-[#C2C7D6] font-medium">Apartamentos</li>
                        <li className="text-[20px] text-[#C2C7D6] font-medium">Outros</li>
                    </ul>
                </div>

                <div className="flex-auto">
                    <div className="bg-[#4762FF14] relative py-3 pl-6 rounded-lg flex items-center max-w-[850px]">
                        <input type="search" placeholder="pesquisar por imóveis..." className="w-[85%] outline-none bg-transparent text-[#010101] pr-4"></input>
                        <div className="flex items-center gap-1 top-[9px]">
                            <button className="bg-[#5179EF] w-[32px] h-[32px] rounded-full flex justify-center items-center">
                                <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.307466 8.7821C0.477586 8.7821 0.615654 8.91987 0.615654 9.09029V10.9394C0.615654 13.3186 2.55108 15.2541 4.9303 15.2541C7.30952 15.2541 9.24495 13.3186 9.24495 10.9394V9.09029C9.24495 8.91987 9.38302 8.7821 9.55314 8.7821C9.72326 8.7821 9.86133 8.91987 9.86133 9.09029V10.9394C9.86133 13.5544 7.81372 15.6945 5.23849 15.8547V17.4114H6.77944C6.94956 17.4114 7.08763 17.5492 7.08763 17.7196C7.08763 17.89 6.94956 18.0278 6.77944 18.0278H3.08117C2.91105 18.0278 2.77298 17.89 2.77298 17.7196C2.77298 17.5492 2.91105 17.4114 3.08117 17.4114H4.62211V15.8547C2.04688 15.6945 -0.000723839 13.5541 -0.000723839 10.9394V9.09029C-0.000723839 8.91987 0.137345 8.7821 0.307466 8.7821Z" fill="#FEFDFE"/>
                                    <path d="M4.93023 14.3295C3.06107 14.3295 1.54015 12.8086 1.54015 10.9395V3.54291C1.54015 1.67375 3.06107 0.152832 4.93023 0.152832C6.7994 0.152832 8.32031 1.67375 8.32031 3.54291V10.9395C8.32031 12.8086 6.7994 14.3295 4.93023 14.3295Z" fill="#FEFDFE"/>
                                </svg>
                            </button>
                            <button className="bg-[#5179EF] w-[32px] h-[32px] rounded-full flex justify-center items-center">
                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.844 15.2942L12.743 10.1895L10.1035 12.8289L15.2082 17.9337C15.6271 18.3526 16.3167 18.3526 16.7356 17.9337L17.844 16.8252C18.2629 16.4026 18.2629 15.7094 17.844 15.2942Z" fill="#FEFDFE"/>
                                    <path d="M10.2192 11.6909L11.6019 10.3081L10.0264 8.73258C11.5167 6.58615 11.3091 3.61303 9.39619 1.70015C7.24976 -0.446275 3.76135 -0.446275 1.61121 1.70015C-0.538924 3.84658 -0.535217 7.33499 1.61121 9.48513C3.52409 11.398 6.49721 11.6056 8.64364 10.1153L10.2192 11.6909ZM2.67887 8.40265C1.12187 6.84565 1.12187 4.3211 2.67887 2.76781C4.23586 1.21081 6.76042 1.21081 8.31371 2.76781C9.8707 4.3248 9.8707 6.84936 8.31371 8.40265C6.76042 9.95964 4.23586 9.95964 2.67887 8.40265Z" fill="#FEFDFE"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}