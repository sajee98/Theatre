import Hero from "../component/Hero";
import Navbar from "../component/Navbar";
import AboutImg from "../assets/night.jpg";
import Footer from "../component/Footer";


function About(){
    return(
        
       <>
        <Navbar />
        <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="About"
        text="If You Have Money Then book the tickets"
        url="/"
        buttonText="Travel up"
        btnClass="show"
        />
        <Footer />
          
      </>  
    )
}
export default About;