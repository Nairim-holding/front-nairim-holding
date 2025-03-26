import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutUs from "@/components/Home/AboutUs";
import Contact from "@/components/Home/Contact";

export default function Home() {
  return (
    <div>
        <Header></Header> 
        <main>
          <AboutUs></AboutUs>
          <Contact></Contact>
        </main>
        <Footer></Footer>
    </div>
  );
}
