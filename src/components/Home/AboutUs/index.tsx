import Image from "next/image";

export default function AboutUs(){
    return(
        <section className="relative p-10 flex justify-center items-center mobile:flex-col mobile:p-3">
            <div>
                <Image className="rounded-sm w-[902px] h-[759px] object-cover mobile:w-full mobile:h-full" src={'/images/image-aboutUs.png'} width={902} height={759} alt="imagem"></Image>
            </div>
            
            <div className="width-[450px] max-w-[450px] tablet:max-w-[350px] mobile:max-w-[100%] min-h-[600px] bg-bg_footer p-10 mobile:p-5 text-white flex justify-around align-center flex-col ml-[-150px] tablet:ml-[-100px] mobile:ml-0 rounded-sm">
                <h2 className="text-[32px] font-bold">Sobre nós</h2>
                <p className="flex flex-col gap-5">
                    <span>Fundada em 2023, a Nairim nasceu para <b>transformar a gestão imobiliária</b> com eficiência e transparência.</span>

                    <span>Com sede em <b>Garça/SP</b>, atuamos na <b>administração, locação, compra e venda de imóveis</b>, sempre com ética, inovação e compromisso com a valorização patrimonial.</span>

                    <span>Nosso diferencial está na <b>qualidade do serviço e na confiança construída com clientes e parceiros.</b></span>

                    <span>Priorizamos práticas sustentáveis e responsabilidade social, garantindo segurança e tranquilidade para proprietários e investidores.</span>

                    <span><b>Na Nairim, seu patrimônio é nosso compromisso.</b></span>
                </p>
            </div>
        </section>
    )
}