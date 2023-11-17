import { FC } from "react";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  windowWidth: number;
  windowHeight: number;
}

const Home: FC<Props> = ({ windowHeight, windowWidth }) => {
const tlProgressBar = useRef<GSAPTimeline>()


  useEffect(() => {

      let ctx = gsap.context(() => {
        tlProgressBar.current = gsap
          .timeline({
            ease:'none',
          })
          .to(".progress", {
            width: "120px",
            duration: 1.2,
            ease:'none',
          })
          .to(".progress", {
            width: "230px",
            duration: 0.7,
            ease:'none',
          })
          .to(".progress", {
            width: "320px",
            duration: 0.9,
            ease:'none',
          })
          .to(".progress", {
            width: "400px",
            duration: 2,
            ease:'none',
          });
      })
  
      return () => {
        ctx.revert()
      }



  }, []);


  return (
    <div
      className="Homepage"
      style={{ width: windowWidth, height: windowHeight }}
    >
      <div className="background">
        <div className="race-line"></div>
        <div className="gradient"></div>
        <div className="race-line"></div>
      </div>
        <div className="logo">
          <img src="src/assets/img/HomePage.gif" alt="" draggable="false" />
        </div>
      <div className="menu">
        <div className="loading">
          <img src="src/assets/img/progress-bar.svg" alt="" />
          <div className="progress"></div>
        </div>
        <div className="text blink">▶ Appuie sur Start</div>
      </div>
    </div>
  );
};

export default Home;
