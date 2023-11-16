import { useEffect, useState, useRef, useContext } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { WindowSizeContext } from '@/contexts/WindowSize'

const Map = () => {
  const reqAnim = useRef(0)
  let [bgPos, setBgPos] = useState(0)
  let [bgSpeed, setBgSpeed] = useState(5)
  let [mamiePosX, setMamiePosX] = useState(10)
  let [dieselPosX, setDieselPosX] = useState(60)
  const windowSize = useContext(WindowSizeContext)

  let tlVoitureMamie = gsap.timeline({
    yoyo: true,
    repeat: -1
  })
  let tlVoitureDiesel = gsap.timeline({ yoyo: true, repeat: -1 })

  const handleBgPos = () => {
    setBgPos((prev) => prev - bgSpeed)
    reqAnim.current = requestAnimationFrame(handleBgPos)
  }

  useEffect(() => {
    reqAnim.current = requestAnimationFrame(handleBgPos)

    tlVoitureMamie.to('.voiture-mamie img', {
      x: '-10%',
      y: '12%',
      duration: 1,
      ease: 'none',
      rotation: -2
    })

    tlVoitureMamie.to('.voiture-mamie img', {
      x: '4%',
      y: '2%',
      ease: 'none',
      duration: 0.7,
      rotation: 1
    })

    tlVoitureMamie.to('.voiture-mamie img', {
      x: '8%',
      y: '8%',
      ease: 'none',
      duration: 1.2,
      rotation: -3
    })

    tlVoitureDiesel.to('.voiture-diesel img', {
      x: '8%',
      y: '8%',
      ease: 'none',
      duration: 0.8,
      rotation: -3
    })

    tlVoitureDiesel.to('.voiture-diesel img', {
      x: '2%',
      y: '-4%',
      ease: 'none',
      duration: 1,
      rotation: 2
    })

    tlVoitureDiesel.to('.voiture-diesel img', {
      x: '12%',
      y: '-10%',
      ease: 'none',
      duration: 0.6,
      rotation: -1
    })
  }, [])

  return (
    <div className='container-map'>
      <div
        className='background-map'
        style={{
          backgroundPositionX: `${bgPos}px`,
          height: `${(windowSize.height * 20) / 100}px`
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
