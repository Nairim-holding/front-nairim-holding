import CarrosselBanner from "@/components/CarrosselBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutUs from "@/components/Home/AboutUs";
import Contact from "@/components/Home/Contact";

export default function Home() {
  return (
    <>
        <Header></Header> 
        <main>
          <CarrosselBanner></CarrosselBanner>
          <AboutUs></AboutUs>
          <Contact></Contact>
        </main>
        <Footer></Footer>
    </>
  );
}
