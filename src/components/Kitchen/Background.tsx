import gsap from 'gsap'
import { useEffect, useRef } from 'react'

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
      <div className='background-city'></div>
    </div>
  )
}

export default Background
