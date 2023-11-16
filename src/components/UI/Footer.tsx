import { useEffect, useState, useRef, FC } from "react";
import ButtonOrange from "./ButtonOrange";
import ButtonViolet from "./ButtonViolet";
import ButtonSound from "./ButtonSound";

interface Props {
  // footerStart : Function;
  // footerSound:boolean;
}

const Footer : FC<Props> = ({}) => {

  const clickStart = () => {
    console.log('ok');
    // footerStart();
  }

  const clickSound = (isSoundActive:boolean) => {
    console.log(isSoundActive);
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
