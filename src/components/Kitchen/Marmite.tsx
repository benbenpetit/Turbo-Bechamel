import { useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Marmite = () => {
  const initMarmite = () => {
    var log = document.querySelector("#rotation");

    gsap.set("#spinner", { transformOrigin: "center" });

    Draggable.create("#spinner", {
      type: "rotation",
      inertia: true,
      onDrag: updateRotation,
      onThrowUpdate: updateRotation,
    });

    function updateRotation() {
      log.innerHTML = Math.trunc(this.rotation.toFixed(1) / 360);
    }
  };

  useEffect(() => {
    initMarmite();
  }, []);

  return (
    <div className="marmite-container">
      <div id="rotation">0</div>
      <div className="marmite">
        <div className="sauce-tomate">
          <div id="spinner">
            <img src="/src/assets/img/bolo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marmite;
