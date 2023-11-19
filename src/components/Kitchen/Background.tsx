import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import CityBgImg from '@/assets/img/city-bg.jpg'

const Background = () => {
  const bgRef = useRef(null)
  const tl = useRef<GSAPTimeline>()

  useEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({
          defaults: { ease: 'pouwer4.easeOut', repeat: -1, repeatDelay: 3 }
        })
        .to(bgRef.current, { y: 8, duration: 0.1 })
        .to(bgRef.current, { y: 0, duration: 0.1 })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className='background-city-container' ref={bgRef}>
      <div
        className='background-city'
        style={{ background: `url(${CityBgImg}) repeat-x` }}
      />
    </div>
  )
}

export default Background
