import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  Sky,
  Center,
  Text3D,
  Line,
} from "@react-three/drei";
import * as THREE from "three";
import Typewriter from "typewriter-effect";
import { Model } from "./Villa";
import gsap from "gsap";
import FeaturesSection from "./components/Features";
import GallerySection from "./components/Gallery";
import ContactSection from "./components/Contact";
import RaycasterComponent from "./components/RayCaster";

const Experience = () => {
  const cameraRef = useRef();
  const [targetIndex, setTargetIndex] = useState(0);
  const [intersectedPoint, setIntersectedPoint] = useState(null);

  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonRef = useRef(null);

  // const points = [
  //   { x: 0, y: 0, z: 5 },
  //   { x: -11.513461910677618, y: 2.2478608703613272, z: -22.069100742524093 },
  //   { x: 1.2046490559796101, y: 4.2477264671325683, z: -12.076613306388918 },
  //   { x: 5.2311059334653915, y: 4.3882437019348144, z: -8.0133869557027975 },
  //   { x: -31.10508824458342, y: 3.24772551345825145, z: -3.6089428886159567 },
  //   { x: 4.536922494727971, y: 12.597287612885356, z: -8.334095492097667 },
  //   // Add more points as needed
  // ];

  const camera = useThree((state) => state.camera);
  const points = useRef([]);

  // const pointss = [
  //   new THREE.Vector3(0, 0, 5),
  //   new THREE.Vector3(-11.513, 2.248, -22.069),
  //   new THREE.Vector3(1.205, 4.248, -12.077),
  //   new THREE.Vector3(5.231, 4.388, -8.013),
  //   new THREE.Vector3(-31.105, 3.248, -3.609),
  //   new THREE.Vector3(4.537, 12.597, -8.334),
  // ];

  // const path = THREE.CatmullRomCurve3(pointss);
  // const points = path.getPoints(50);
  // const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // const material = new THREE.LineBasicMaterial({
  //   color: 0xff0000,
  // });

  // Creating the final object to add to the scene
  //const curveObject = new THREE.Line(geometry, material);

  const div1Ref = useRef(null);
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
    points.current = path.getPoints(100);

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
    gsap.to(camera.position, {
      duration: 5,
      repeat: -1,
      yoyo: true,
      onUpdate: function () {
        const t = gsap.getProperty(this, "progress");
        const position = path.getPointAt(t);
        camera.position.copy(position);

        const tangent = path.getTangentAt(t);
        const lookAt = position.clone().add(tangent);
        camera.lookAt(lookAt);
      },
      ease: "power1.inOut",
    });
  }, [camera]);
  const handleNextPoint = () => {
    const nextIndex = (targetIndex + 1) % points.length;
    setTargetIndex(nextIndex);

    const target = points[nextIndex];
    gsap.to(cameraRef.current.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 2,
      ease: "power2.inOut",
    });
  };

  return (
    <Suspense
      fallback={
        <>
          <h>Loading ....</h>
        </>
      }
    >
      <div className="model">
        <Canvas className="canvas">
          <Line
            points={points.current} // Pass the points to the Line component
            color="red"
            lineWidth={2}
          />
          <Sky sunPosition={[100, 20, 100]} />
          <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} makeDefault />
          <pointLight position={[0, 10, -5]} intensity={1} color="#fff" />
          <directionalLight />
          <Model className="model" />
          <ambientLight intensity={0.5} />
          <OrbitControls />
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
              className="flex items-center justify-center min-w-96 min-h-72  p-8 rounded-xl px-24 bg-gray-900 text-white"
            >
              <div className="text-center space-y-6">
                <h1
                  ref={headlineRef}
                  className="text-5xl font-bold tracking-tight"
                >
                  <Typewriter
                    options={{
                      loop: true,
                    }}
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
                  onClick={handleNextPoint}
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
            <FeaturesSection param={handleNextPoint} />
          </Html>
          <Html
            position={[
              1.5046490559796101, 4.1477264671325794, -10.076613306388918,
            ]}
            occlude
          >
            <GallerySection param={handleNextPoint} />
          </Html>
          <Html
            position={[
              3.2311059334653915, 3.8882437019348144, -2.0133869557027975,
            ]}
            occlude
          >
            {" "}
            <Text3D>
              Hello world!
              <meshNormalMaterial />
            </Text3D>
            <ContactSection param={handleNextPoint} />
          </Html>
        </Canvas>
        <button
          style={{ position: "absolute", translate: "20" }}
          onClick={handleNextPoint}
        >
          Move to Next Point
        </button>
      </div>
    </Suspense>
  );
};

export default Experience;
