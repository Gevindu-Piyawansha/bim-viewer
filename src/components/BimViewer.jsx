import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";

const BimViewer = ({ onElementClick, ifcFile }) => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const ifcLoaderRef = useRef();
  const [loading, setLoading] = useState(false);

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
    camera.position.set(15, 15, 15);
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
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(50, 50);
    scene.add(gridHelper);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // IFC Loader setup
    const ifcLoader = new IFCLoader();
    ifcLoader.ifcManager.setWasmPath("/wasm/");
    ifcLoaderRef.current = ifcLoader;

    // Add a sample cube if no IFC file
    if (!ifcFile) {
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
    }

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = async (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const object = intersects[0].object;

        // If IFC model, get properties
        if (object.modelID !== undefined) {
          const index = intersects[0].faceIndex;
          const id = ifcLoader.ifcManager.getExpressId(object.geometry, index);
          const props = await ifcLoader.ifcManager.getItemProperties(
            object.modelID,
            id
          );

          onElementClick({
            id: id,
            type: props.type || "IFC Element",
            material: props.Name?.value || "N/A",
            dimensions: "N/A",
            status: "completed",
            cost: Math.floor(Math.random() * 10000) + 1000,
            properties: props,
          });
        } else if (object.userData && object.userData.id) {
          onElementClick(object.userData);
        }

        // Highlight selected object
        scene.traverse((child) => {
          if (child.material && child.material.emissive) {
            child.material.emissive.setHex(0x000000);
          }
        });
        if (object.material && object.material.emissive) {
          object.material.emissive.setHex(0x555555);
        }
      }
    };

    renderer.domElement.addEventListener("click", onClick);

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
      ifcLoader.ifcManager.dispose();
    };
  }, [onElementClick]);

  // Load IFC file when provided
  useEffect(() => {
    if (ifcFile && ifcLoaderRef.current && sceneRef.current) {
      setLoading(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const blob = new Blob([data]);
        const url = URL.createObjectURL(blob);

        ifcLoaderRef.current.load(
          url,
          (ifcModel) => {
            sceneRef.current.add(ifcModel);
            setLoading(false);

            // Center camera on model
            const box = new THREE.Box3().setFromObject(ifcModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const camera = cameraRef.current;
            camera.position.set(
              center.x + maxDim,
              center.y + maxDim,
              center.z + maxDim
            );
            camera.lookAt(center);
          },
          (progress) => {
            console.log((progress.loaded / progress.total) * 100 + "% loaded");
          },
          (error) => {
            console.error("Error loading IFC:", error);
            setLoading(false);
          }
        );
      };
      reader.readAsArrayBuffer(ifcFile);
    }
  }, [ifcFile]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 100,
          }}
        >
          Loading IFC Model...
        </div>
      )}
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default BimViewer;
