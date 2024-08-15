import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const RaycasterComponent = ({ cameraRef, setIntersectedPoint }) => {
  const { scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault();
      const { clientX, clientY } = event;
      const { width, height } = event.target.getBoundingClientRect();

      mouse.current.x = (clientX / width) * 2 - 1;
      mouse.current.y = -(clientY / height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        const { point } = intersects[0];
        setIntersectedPoint(point);
        console.log("Intersected Point:", point);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [cameraRef, scene]);

  return null;
};

export default RaycasterComponent;
