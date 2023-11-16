import { useEffect, useState, useRef, FC } from "react";

interface Props {
  title?: string;
  imgSrc?: string;
  trigger: boolean;
  onPress: Function;
}

const ButtonSound: FC<Props> = ({ title, imgSrc, trigger, onPress }) => {
  let [isPressed, setIsPressed] = useState(false);
  let [isSoundActive, setIsSoundActive] = useState(false);

  const handleClick = () => {
    setIsSoundActive(!isSoundActive);
    onPress(isSoundActive);


    if (!trigger) {
      setIsPressed(!isPressed);
    } else {
      let resetButton = () => {
        setIsPressed(false);
      };
      setIsPressed(true);
      setTimeout(resetButton, 100);
    }
  };

  return (
    <div className="button-orange-container">
      <div className="button" onClick={() => handleClick()}>
        <img
          src={
            isPressed
              ? "src/assets/img/button-violet-pressed.png"
              : "src/assets/img/button-violet-neutral.png"
          }
          alt=""
        />
        <div
          className="label"
          style={{
            transform: isPressed
              ? "translate(-50%, -70%)"
              : "translate(-50%, -80%)",
          }}
        >
          {title && <span>{title}</span>}
          {imgSrc && (
            <img
              src={
                isPressed
                  ? "src/assets/img/sound-on.png"
                  : "src/assets/img/sound-off.png"
              }
              alt=""
              draggable="false"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonSound;
