import { useEffect } from "react";
import {
  Header,
  AboutDev,
  AboutJokes,
  BgDecoration,
  Hero,
  Footer,
} from "./components";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <div className="container overflow-hidden">
      <span
        className="hidden text-purple-600 bg-purple-200 text-teal-600
             bg-teal-200 text-green-600 bg-green-200 text-yellow-600 bg-yellow-200
              text-orange-600 bg-orange-200 text-red-600 bg-red-200 "
      ></span>

      <Header />
      <BgDecoration />
      <Hero />
      <AboutJokes />
      <AboutDev />
      <Footer />
    </div>
  );
}

export default App;
