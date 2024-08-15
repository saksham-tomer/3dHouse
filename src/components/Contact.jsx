import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ContactSection = ({ param }) => {
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="relative min-h-96 bg-gray-900 text-white py-8 rounded-xl min-w-96 shadow-2xl ">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <div
          ref={formRef}
          className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-teal-400 text-gray-900 font-semibold rounded-md shadow-lg hover:bg-teal-500 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
        <button
          onClick={param}
          className="text-white font-bold transform translate-y-3 -translate-x-24  px-20 py-1 bg-gradient-to-tr from-teal-300 to-blue-400 hover:bg-teal-500 rounded-2xl shadow-xl absolute"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
