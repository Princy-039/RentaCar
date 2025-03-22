/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Service from "../components/Service";
import Locations from "../components/Locations";
import Testimonials from "../components/Testimonials";
import Blog from "../components/Blog";
import Offers from "../components/Offers";


const LandingPage = ({ theme, setTheme }) => {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="relative">
        <Hero />
        {/* <div className="absolute top-20 right-10 bg-white p-6 rounded-xl shadow-lg w-80"> */}
          {/* <BookingForm /> Added the rental booking form inside the hero section */}
        {/* </div> */}
      </div>
      <About />
      <Features />
      <Service/>
      <Locations/>
      <Offers/>
      <Testimonials/>
      <Blog/>
      <Footer/>
   
    </>
  );
};

export default LandingPage;
