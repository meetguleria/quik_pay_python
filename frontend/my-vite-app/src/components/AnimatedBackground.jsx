import { useEffect } from "react";
import Granim from "granim";

const AnimatedBackground = () => {
  useEffect(() => {
    new Granim({
      element: '#granim-canvas',
      direction: 'left-right',
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ['#4A00E0', '#8E2DE2', '#DA22FF'], 
            ['#8E2DE2', '#4A00E0', '#9B26B6'],
          ],
          transitionSpeed: 6000,
        },
      },
    });
},[]);

  return (
    <canvas id="granim-canvas" style={{position: 'fixed', width: '100vw', height: '100vh', zIndex: -1 }}></canvas>
  );
};

export default AnimatedBackground;