import { useState, FC } from 'react'
import ButtonOrangePressedImg from '@/assets/img/button-orange-pressed.png'
import ButtonOrangeNeutralImg from '@/assets/img/button-orange-neutral.png'

interface Props {
  title?: string
  imgSrc?: string
  trigger: boolean
  onPress: () => void
}

const ButtonOrange: FC<Props> = ({ title, imgSrc, trigger, onPress }) => {
  let [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    onPress()

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
          src={isPressed ? ButtonOrangePressedImg : ButtonOrangeNeutralImg}
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
          {imgSrc && <img src={imgSrc} alt='' draggable='false' />}
        </div>
      </div>
    </div>
  )
}

export default ButtonOrange
