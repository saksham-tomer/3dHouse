import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FeaturesSection = ({ param }) => {
  const featureRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      featureRefs.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.3, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="min-h-60 min-w-96 relative backdrop-blur-xl shadow-md  py-8 rounded-xl  bg-gray-900 ">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-cyan-500">
          Property Features
        </h2>
        <div className="grid grid-rows-1 md:grid-rows-3 gap-8 ">
          {["Spacious Rooms", "Modern Kitchen", "Scenic Views"].map(
            (feature, index) => (
              <div
                key={index}
                ref={(el) => (featureRefs.current[index] = el)}
                className="bg-gradient-to-tr from-teal-500 to-cyan-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-4 text-white">{feature}</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            )
          )}
        </div>
        <button
          onClick={param}
          className="absolute text-white transform p-4 -translate-x-4 rounded-full bg-teal-400 translate-y-3 ring-2 font-bold hover:bg-teal-500 ring-blue-600"
        >
          click
        </button>
      </div>
    </section>
  );
};

export default FeaturesSection;
