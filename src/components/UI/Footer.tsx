import { useEffect, FC } from 'react'
import ButtonOrange from './ButtonOrange'
import ButtonViolet from './ButtonViolet'
import ButtonSound from './ButtonSound'
import ArrowLeftImg from '@/assets/img/arrow-l.svg'
import ArrowRightImg from '@/assets/img/arrow-r.svg'
import SoundOnImg from '@/assets/img/sound-on.png'

interface Props {
  footerStart: Function
  footerSound: Function
  goRight: Function
  goLeft: Function
}

const Footer: FC<Props> = ({ footerStart, footerSound, goRight, goLeft }) => {
  const clickStart = () => {
    footerStart()
  }

  const clickSound = (isSoundActive: boolean) => {
    footerSound(isSoundActive)
  }

  useEffect(() => {}, [])

  return (
    <div className='footer'>
      <ButtonSound
        imgSrc={SoundOnImg}
        trigger={false}
        onPress={(isSoundActive: boolean) => {
          {
            clickSound(isSoundActive)
          }
        }}
      />
      <ButtonOrange
        imgSrc={ArrowLeftImg}
        trigger={true}
        onPress={() => goLeft()}
      />
      <ButtonOrange
        imgSrc={ArrowRightImg}
        trigger={true}
        onPress={() => goRight()}
      />
      <ButtonViolet
        title='start'
        trigger={true}
        onPress={() => {
          clickStart()
        }}
      />
    </div>
  )
}

export default Footer
