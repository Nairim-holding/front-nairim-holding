import Form from "@/components/Form";

export default function Contact(){
   return(
    <section className="pt-8 font-inter">
        <div className="flex items-center justify-end bg-[url('/images/bg-contact.png')] bg-[center_70%] bg-no-repeat 2xl:bg-cover h-full w-full py-10">
        <div className="bg-secondary py-10 px-16 rounded-xl mr-20 max-w-[550px] h-full mobile:mx-5 mobile:px-8 mobile-sm:m-0 mobile-sm:px-4">
            <h1 className="text-text_black_light text-[56px] font-bold mb-3 leading-[1] mobile:text-5xl">Ainda tem alguma dúvida?</h1>
            <p className="text-text_black_light opacity-80 mb-4 text-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.</p>
            <Form>
                <input className="mb-5 px-5 py-4 bg-bg_input outline-none rounded-md" type="text" name="nome" id="nome" placeholder="Nome"></input>
                <input className="mb-5 px-5 py-4 bg-bg_input outline-none rounded-md" type="email" name="email" id="email" placeholder="Email"></input>
                <input className="mb-8 px-5 py-4 bg-bg_input outline-none rounded-md" type="text" name="message" id="message" placeholder="Mensagem"></input>
                <button className="bg-primary py-4 rounded-md text-white font-semibold text-[18px] outline-none duration-100 ease-linear hover:opacity-90" type="submit">Enviar</button>
            </Form>
        </div>
        </div>
    </section>
   ) 
}