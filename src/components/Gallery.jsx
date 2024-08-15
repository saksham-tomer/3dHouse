import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import img1 from "../assets/Designer (9).jpeg";
import img2 from "../assets/Designer (12).jpeg";
import img3 from "../assets/Designer (12).jpeg"

const GallerySection = ({ param }) => {
  const imageRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      imageRefs.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.3, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="min-h-60  py-8 rounded-xl bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl text-white font-bold mb-8">Gallery</h2>
        <div className="flex flex-col md:flex-row xl:flex-row 2xl:flex-row justify-center gap-6">
          {[img1, img2, img3].map((src, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="w-64 h-64 bg-gray-300 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={src}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <button
          onClick={param}
          className="mt-4 hover:bg-blue-700 rounded-xl text-white font-semibold px-6 py-1 bg-gradient-to-tr from-blue-400 to-blue-600"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default GallerySection;
