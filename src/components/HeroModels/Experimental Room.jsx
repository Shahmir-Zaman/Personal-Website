import Spline from '@splinetool/react-spline';

export default function App() {
  function onLoad(splineApp) {
    const camera = splineApp.findObjectByName('Camera');

    if (camera) {
      // Move the camera back
      camera.position.z = 12000; // increase this to zoom further out
      camera.position.y = 500;  // optional, move camera up

      // Adjust field of view
      camera.fov = 75;
      camera.updateProjectionMatrix();

      // ✅ Force Spline to use this camera
      splineApp.setCamera(camera);
    }
  }

  return (
      <Spline scene="https://prod.spline.design/0CooTkPx85Ec3XZH/scene.splinecode" />
  );
}




