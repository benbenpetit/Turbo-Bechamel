import { FC } from 'react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HomeGif from '@/assets/img/HomePage.gif'
// import HomeWebm from '@/assets/img/HomePage.webm'
import ProgressBarImg from '@/assets/img/progress-bar.svg'

interface Props {
  windowWidth: number
  windowHeight: number
  startProgressBar: boolean
}

const Home: FC<Props> = ({ windowHeight, windowWidth, startProgressBar }) => {
  const tlProgressBar = useRef<GSAPTimeline>()

  tlProgressBar.current = gsap
    .timeline({
      ease: 'none',
      paused: true
    })
    .to('.progress', {
      width: '120px',
      duration: 1.2,
      ease: 'none'
    })
    .to('.progress', {
      width: '230px',
      duration: 0.7,
      ease: 'none'
    })
    .to('.progress', {
      width: '320px',
      duration: 0.9,
      ease: 'none'
    })
    .to('.progress', {
      width: '400px',
      duration: 2,
      ease: 'none'
    })

  useEffect(() => {
    if (startProgressBar) {
      tlProgressBar.current?.restart()
    }
  }, [startProgressBar])

  return (
    <div
      className='Homepage'
      style={{ width: windowWidth, height: windowHeight }}
    >
      <div className='background'>
        <div className='race-line'></div>
        <div className='gradient'></div>
        <div className='race-line'></div>
      </div>
      <div className='logo'>
        <img src={HomeGif} alt='' draggable='false' />
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
          src={HomeWebm}
          style={{ width: '100%', height: '100%' }}
        /> */}
      </div>
      <div className='menu'>
        <div className='loading'>
          <img src={ProgressBarImg} alt='' />
          <div className='progress'></div>
        </div>
        <div className='text blink'>▶ Appuie sur Start</div>
      </div>
    </div>
  )
}

export default Home
