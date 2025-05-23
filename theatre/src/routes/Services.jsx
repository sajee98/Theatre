import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import ServiceImg from "../assets/10.jpg"
import Footer from "../component/Footer";

function Services(){
    return(
        <>
        <Navbar />
        <Hero
        cName="hero-mid"
        heroImg={ServiceImg}
        title="Services"
        btnClass="hide"
        /> 
        <Footer />
       
          </>
    )
}
export default Services;