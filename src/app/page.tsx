import Assessment from "@/components/Home/Assessment";
import CarrosselBanner from "@/components/Home/CarrosselBanner";
import CarrosselFilter from "@/components/Home/CarrosselFilter";
import AboutUs from "@/components/Home/AboutUs";
import Contact from "@/components/Home/Contact";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";

export default function Home() {
  return (
    <>
        <Header></Header> 
        <main className="main-home">
          <CarrosselBanner></CarrosselBanner>
          <CarrosselFilter></CarrosselFilter>
          <AboutUs></AboutUs>
          <Assessment></Assessment>
          <Contact></Contact>
        </main>
        <Footer></Footer>
    </>
  );
}
