import Navbar from "../component/Navbar";
import ContactImg from "../assets/1.jpg";
import Hero from "../component/Hero";
import Footer from "../component/Footer";

function Contact(){
    return(
        <>
        <Navbar />
        <Hero
        cName="hero-mid"
        heroImg={ContactImg}
        title="Contact"
        btnClass="hide"
        />
         <Footer />
        </>
    )
}
export default Contact;