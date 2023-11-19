import { useState, FC } from 'react'
import ButtonVioletPressImg from '@/assets/img/button-violet-pressed.png'
import ButtonVioletNeutralImg from '@/assets/img/button-violet-neutral.png'
import SoundOnImg from '@/assets/img/sound-on.png'
import SoundOffImg from '@/assets/img/sound-off.png'

interface Props {
  title?: string
  imgSrc?: string
  trigger: boolean
  onPress: Function
}

const ButtonSound: FC<Props> = ({ title, imgSrc, trigger, onPress }) => {
  let [isPressed, setIsPressed] = useState(true)
  let [isSoundActive, setIsSoundActive] = useState(true)

  const handleClick = () => {
    setIsSoundActive(!isSoundActive)
    onPress(isSoundActive)

    if (!trigger) {
      setIsPressed(!isPressed)
    } else {
      let resetButton = () => {
        setIsPressed(false)
      }
      setIsPressed(true)
      setTimeout(resetButton, 100)
    }
  }

  return (
    <div className='button-orange-container'>
      <div className='button' onClick={() => handleClick()}>
        <img
          src={isPressed ? ButtonVioletPressImg : ButtonVioletNeutralImg}
          alt=''
        />
        <div
          className='label'
          style={{
            transform: isPressed
              ? 'translate(-50%, -70%)'
              : 'translate(-50%, -80%)'
          }}
        >
          {title && <span>{title}</span>}
          {imgSrc && (
            <img
              src={isPressed ? SoundOnImg : SoundOffImg}
              alt=''
              draggable='false'
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ButtonSound
