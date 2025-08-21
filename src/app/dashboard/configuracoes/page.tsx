import Image from "next/image";

export default function Page(){
    return(
        <center>
            <Image src={'/brainrot/gif1.gif'} width={500} height={500} alt="abatukan"></Image>
            <h1 className="font-bold">O cara acha que vou fazer a página de configuração</h1>
            <h2>Não sei centralizar uma div por isso irei usar {`<center>`} - levei vantagi</h2>
        </center>
    )
}