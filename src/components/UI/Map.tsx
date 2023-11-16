import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const Map = () => {
  const reqAnim = useRef(0)
  let [bgPos, setBgPos] = useState(0)
  let [bgSpeed, setBgSpeed] = useState(1)
  let [mamiePosX, setMamiePosX] = useState(10)
  let [dieselPosX, setDieselPosX] = useState(60)
  const tlVoitureMamie = useRef<GSAPTimeline>()
  const tlVoitureDiesel = useRef<GSAPTimeline>()

  const handleBgPos = () => {
    setBgPos((prev) => prev - bgSpeed)
    reqAnim.current = requestAnimationFrame(handleBgPos)
  }

  useEffect(() => {
    reqAnim.current = requestAnimationFrame(handleBgPos)

    let ctx = gsap.context(() => {
      tlVoitureMamie.current = gsap
        .timeline({
          yoyo: true,
          repeat: -1
        })
        .to('.voiture-mamie img', {
          x: '-10%',
          y: '12%',
          duration: 1,
          ease: 'none',
          rotation: -2
        })
        .to('.voiture-mamie img', {
          x: '4%',
          y: '2%',
          ease: 'none',
          duration: 0.7,
          rotation: 1
        })
        .to('.voiture-mamie img', {
          x: '8%',
          y: '8%',
          ease: 'none',
          duration: 1.2,
          rotation: -3
        })

      tlVoitureDiesel.current = gsap
        .timeline({
          yoyo: true,
          repeat: -1
        })
        .to('.voiture-diesel img', {
          x: '8%',
          y: '8%',
          ease: 'none',
          duration: 0.8,
          rotation: -3
        })
        .to('.voiture-diesel img', {
          x: '2%',
          y: '-4%',
          ease: 'none',
          duration: 1,
          rotation: 2
        })
        .to('.voiture-diesel img', {
          x: '12%',
          y: '-10%',
          ease: 'none',
          duration: 0.6,
          rotation: -1
        })
    })

    return () => {
      cancelAnimationFrame(reqAnim.current)
      ctx.revert()
    }
  }, [])

  return (
    <div className='container-map'>
      <div
        className='background-map'
        style={{
          backgroundPositionX: `${bgPos % 3000}%`
        }}
      ></div>

      <div className='voitures'>
        <div className='voiture-mamie' style={{ left: `${mamiePosX}vw` }}>
          <img src='src/assets/img/car_mamie.png' alt='' draggable='false' />
        </div>

        <div className='voiture-diesel' style={{ left: `${dieselPosX}vw` }}>
          <img src='src/assets/img/car_vin.png' alt='' draggable='false' />
        </div>
      </div>
    </div>
  )
}

export default Map
