import Image from "next/image";

export default function AboutUs(){
    return(
        <section className="relative py-10 flex justify-center align-center">
            <div className="pr-[100px]">
                <Image src={'/images/image-aboutUs.png'} width={902} height={759} alt="imagem"></Image>
            </div>
            
            <div className="width-[500px] max-w-[500px] min-h-[600px] bg-bg_footer p-10 text-white flex justify-around align-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-[32px]">Sobre nós</h2>
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