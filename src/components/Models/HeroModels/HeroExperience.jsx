import Spline from '@splinetool/react-spline';
import { useMediaQuery } from 'react-responsive';

export default function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 1279px)' }); // xl breakpoint

  function onLoad(splineApp) {
    const camera = splineApp.findObjectByName('Camera');

    if (camera) {
      if (isMobile) {
        // Mobile/Tablet settings - zoom out more
        camera.position.x = 0;
        camera.position.y = 3000;  // Higher up
        camera.position.z = 15; // Much further back
        camera.fov = 50;           // Narrower field of view
      } else {
        // Desktop settings - original positioning
        camera.position.x = 0;
        camera.position.y = 500;
        camera.position.z = 12000;
        camera.fov = 75;
      }
      
      camera.updateProjectionMatrix();
      splineApp.setCamera(camera);
    }
  }

  return (
      <Spline 
        scene="https://prod.spline.design/0CooTkPx85Ec3XZH/scene.splinecode" 
        onLoad={onLoad}
      />
  );
}