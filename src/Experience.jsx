import React, { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Html, Sky, Line } from "@react-three/drei";
import * as THREE from "three";
import Typewriter from "typewriter-effect";
import { Model } from "./Villa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeaturesSection from "./components/Features";
import GallerySection from "./components/Gallery";
import ContactSection from "./components/Contact";
import RaycasterComponent from "./components/RayCaster";

gsap.registerPlugin(ScrollTrigger);

const CameraAnimation = () => {
  const { camera } = useThree();
  const points = useRef([]);

  useEffect(() => {
    const pointss = [
      new THREE.Vector3(0, 0, 5),
      new THREE.Vector3(-11.513, 2.248, -22.069),
      new THREE.Vector3(1.205, 4.248, -12.077),
      new THREE.Vector3(5.231, 4.388, -8.013),
      new THREE.Vector3(-31.105, 3.248, -3.609),
      new THREE.Vector3(4.537, 12.597, -8.334),
    ];

    const path = new THREE.CatmullRomCurve3(pointss);
    points.current = path.getPoints(200);

    // Camera animation using ScrollTrigger
    ScrollTrigger.create({
      trigger: ".model", // The entire model container
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const t = self.progress; // Scroll progress (0 to 1)
        const position = path.getPointAt(t); // Get camera position based on scroll
        camera.position.copy(position);

        const tangent = path.getTangentAt(t);
        const lookAt = position.clone().add(tangent);
        camera.lookAt(lookAt);
      },
    });
  }, [camera]);

  if (!points.current || points.current.length === 0) {
    return null; // Handle case where points are not generated correctly
  }

  return <Line points={points.current} color="red" lineWidth={2} />;
};

const Experience = () => {
  const [intersectedPoint, setIntersectedPoint] = useState(null);
  const cameraRef = useRef();
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonRef = useRef(null);
  const div1Ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headlineRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      subheadlineRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 1 }
    );
  }, []);

  return (
    <Suspense fallback={<h>Loading ....</h>}>
      <div className="model" style={{ height: "400vh", minWidth: "100vw" }}>
        {" "}
        {/* Increase height for scrolling */}
        <Canvas className="canvas">
          <CameraAnimation />
          <Sky sunPosition={[100, 20, 100]} />
          <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} makeDefault />
          <pointLight position={[0, 10, -5]} intensity={1} color="#fff" />
          <directionalLight />
          <Model className="model" />
          <ambientLight intensity={0.5} />
          <RaycasterComponent
            cameraRef={cameraRef}
            setIntersectedPoint={setIntersectedPoint}
          />
          <Html position={[0, 0, 4.9]} occlude>
            <section
              onMouseEnter={() => {
                gsap.to(div1Ref.current, {
                  scale: 1.08,
                  duration: 0.6,
                  ease: "bounce",
                });
              }}
              onMouseLeave={() => {
                gsap.to(div1Ref.current, {
                  scale: 1,
                  duration: 0.3,
                });
              }}
              ref={div1Ref}
              className="flex items-center justify-center min-w-96 min-h-72 p-8 rounded-xl px-24 bg-gray-900 text-white"
            >
              <div className="text-center space-y-6">
                <h1
                  ref={headlineRef}
                  className="text-5xl font-bold tracking-tight"
                >
                  <Typewriter
                    options={{ loop: true }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(" Welcome To The Site")
                        .pauseFor(2000)
                        .deleteAll()
                        .typeString(" Metaverse like experience.")
                        .start();
                    }}
                  />
                </h1>
                <p ref={subheadlineRef} className="text-lg font-medium">
                  Discover amazing content and features just for you.
                </p>
                <button
                  ref={buttonRef}
                  className="inline-block px-6 py-3 text-lg font-semibold text-gray-900 bg-teal-400 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </section>
          </Html>

          <Html
            position={[-11.00000008, 2.4878608703613272, -21.069100742524093]}
            occlude
          >
            <FeaturesSection />
          </Html>
          <Html
            position={[
              1.5046490559796101, 4.1477264671325794, -10.076613306388918,
            ]}
            occlude
          >
            <GallerySection />
          </Html>
          <Html
            position={[
              3.2311059334653915, 3.8882437019348144, -2.0133869557027975,
            ]}
            occlude
          >
            {" "}
            <ContactSection />
          </Html>
        </Canvas>
      </div>
    </Suspense>
  );
};

export default Experience;
