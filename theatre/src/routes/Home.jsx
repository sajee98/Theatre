import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import Footer from "../component/Footer";
import Movie from "../component/Movie";

function Home(){
    return(
        <>
        <Navbar />
        {/* we can chnage main image to hero section */}
        <Hero
        cName="hero"
        heroImg="https://static.kinoafisha.info/upload/news/947384420503.jpg"
        title="Book your Tickets"
        text="Get The best Experience"
        url="/"
        buttonText="Travel up"
        btnClass="show"
        />
        <Movie />
        <br></br>
        <Footer />
        </>
    )
}
export default Home;