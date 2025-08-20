import Assessment from "@/components/Home/Assessment";
import CarrosselBanner from "@/components/Home/CarrosselBanner";
import CarrosselFilter from "@/components/Home/CarrosselFilter";
import AboutUs from "@/components/Home/AboutUs";
import Contact from "@/components/Home/Contact";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/property`, {
    cache: "no-store"
  });

  const properties = await response.json();
  return (
    <>
        <Header></Header> 
        <main className="main-home">
          <CarrosselBanner propertys={properties.data}></CarrosselBanner>
          <CarrosselFilter propertys={properties.data}></CarrosselFilter>
          <AboutUs></AboutUs>
          <Assessment></Assessment>
          <Contact></Contact>
        </main>
        <Footer></Footer>
    </>
  );
}
