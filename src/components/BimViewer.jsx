import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { IFCLoader } from "web-ifc-three/IFCLoader"; // Uncomment when needed

const BimViewer = ({ onElementClick }) => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();

  useEffect(() => {
    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(8, 13, 15);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Add a sample cube (placeholder for IFC model)
    const geometry = new THREE.BoxGeometry(2, 3, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0x3b82f6 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 1.5, 0);
    cube.userData = {
      id: 1,
      type: "Wall",
      material: "Concrete",
      dimensions: "2m x 3m x 2m",
      status: "completed",
      cost: 5000,
    };
    scene.add(cube);

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData && object.userData.id) {
          onElementClick(object.userData);

          // Highlight selected object
          scene.children.forEach((child) => {
            if (child.material && child.material.emissive) {
              child.material.emissive.setHex(0x000000);
            }
          });
          if (object.material.emissive) {
            object.material.emissive.setHex(0x555555);
          }
        }
      }
    };

    renderer.domElement.addEventListener("click", onClick);

    // IFC Loader (optional - uncomment when you have an IFC file)
    // const ifcLoader = new IfcLoader();
    // ifcLoader.load(
    //   "path/to/your/model.ifc",
    //   (ifcModel) => {
    //     scene.add(ifcModel);
    //   }
    // );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", onClick);
    };
  }, [onElementClick]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default BimViewer;
