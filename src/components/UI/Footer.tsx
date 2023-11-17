import { useEffect, useState, useRef, FC } from "react";
import ButtonOrange from "./ButtonOrange";
import ButtonViolet from "./ButtonViolet";
import ButtonSound from "./ButtonSound";

interface Props {
  footerStart : Function;
  footerSound: Function;
}

const Footer : FC<Props> = ({footerStart, footerSound}) => {

  const clickStart = () => {
    footerStart();
  }

  const clickSound = (isSoundActive:boolean) => {
    footerSound(isSoundActive);
  }

  useEffect(() => {}, []);

  return (
    <div className="footer">
    <ButtonSound imgSrc="src/assets/img/sound-on.png" trigger={false} onPress={(isSoundActive:boolean)=>{{clickSound(isSoundActive)}}}/>
      <ButtonOrange imgSrc="src/assets/img/arrow-l.svg" trigger={true} onPress={()=>{console.log('arrow-left')}}/>
      <ButtonOrange imgSrc="src/assets/img/arrow-r.svg" trigger={true}  onPress={()=>{console.log('arrow-right')}}/>
      <ButtonViolet title='start' trigger={true} onPress={()=>{clickStart()}}/>
    </div>
  );
};

export default Footer;
