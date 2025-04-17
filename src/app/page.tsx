import Assessment from "@/components/Assessment";
import CarrosselBanner from "@/components/CarrosselBanner";
import CarrosselFilter from "@/components/CarrosselFilter";
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
          <CarrosselFilter></CarrosselFilter>
          <AboutUs></AboutUs>
          <Assessment></Assessment>
          <Contact></Contact>
        </main>
        <Footer></Footer>
    </>
  );
}
