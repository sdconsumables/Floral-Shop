import Footer from "./Footer";
import Navbar from "./Navbar";
import { HashLoader } from "react-spinners";
import { useState, useEffect } from "react";


export default function Collections() {
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
        {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#22c55e" size={60} />
        </div>
      )}

      <Navbar scrolled={scrolled} />

      <Footer/>
    </>
  );
}