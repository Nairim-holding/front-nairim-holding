import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Contact from "@/components/Home/Contact";

export default function Home() {
  return (
    <div>
        <Header></Header> 
        <main>
          <Contact></Contact>
        </main>
        <Footer></Footer>
    </div>
  );
}
