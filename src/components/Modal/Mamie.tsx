import { useState, useEffect, FC } from "react";
import { easeIn, easeInOut, motion } from "framer-motion";
import { gsap } from "gsap";

interface Props {
  onPress: Function;
}

const Mamie : FC<Props> = ({onPress}) => {

  useEffect(() => {}, []);

  return (
    <motion.div
      className="container-modal"
      initial={{ opacity: 0, y:'-100%' }}
      animate={{ opacity: 1, y:0 }}
      exit={{ opacity: 0, y:'-100%' }}
      transition={{duration:0.5, ease:easeInOut}}
      onClick={() => onPress()}
    >
      <div className="modal">
        <img src="src/assets/img/mamie.png" alt="" draggable="false" />
        <div className="modal-text">
          <div className="modal-text-title">
            <img
              src="src/assets/img/danger.svg"
              alt=""
            />
          </div>
          <div className="modal-text-content">
            Mamie Mazout tente une percée sur le flanc gauche. Accélérez la
            cadence ou tirez-lui dessus avec le lance-roquette.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Mamie;
