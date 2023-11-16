import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { motion } from "framer-motion";
import {Howl, Howler} from 'howler';

gsap.registerPlugin(Draggable);

const EcraseTomate = () => {

  let [smashed, setSmashed] = useState(false);
  let [tomatoPositionX, setTomatoPositionX] = useState(0)
  let [tomatoPositionY, setTomatoPositionY] = useState(0)
  let [poingPositionX, setPoingPositionX] = useState(0)
  let [poingPositionY, setPoingPositionY] = useState(0)

  let smashSound = new Howl ({
    src: ['src/assets/sounds/goofy-fx/punch.wav']
  })


  const initEcraseTomate = () => {};

  const handleDragFist = (info) => {
    setPoingPositionX(info.point.x)
    setPoingPositionY(info.point.y)
    console.log(info.point.x);
    if (
      Math.abs(tomatoPositionX - poingPositionX) < 40 && 
      Math.abs(tomatoPositionY - poingPositionY) < 60
      ) {
      setSmashed(true);
      smashSound.play();
      console.log(smashed);
    }
  };

  const handleDragTomato = (info) => {
    setTomatoPositionX(info.point.x)
    setTomatoPositionY(info.point.y)
    console.log('moving tomato');
  };

  useEffect(() => {
    initEcraseTomate();
  }, []);

  return (
    <div className="ecrase-tomate">
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragMomentum={true}
        onDrag={(event, info) => handleDragFist(info)}
      >
        <img src="src/assets/img/poing.png" alt="" draggable={false} />
      </motion.div>
      <motion.div
        className="tomate"
        drag
        // drag={smashed?false:true}
        onDrag={(event, info) => handleDragTomato(info)}
        dragConstraints={{
          top: 0,
          left: -400,
          right: 400,
          bottom: 400,
        }}
        dragMomentum={false}
      >
        <img
          src={
            smashed
              ? "src/assets/img/smashed-tomato.png"
              : "src/assets/img/tomate.png"
          }
          alt=""
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

export default EcraseTomate;
