import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import VilleImg from '@/assets/img/ville.png'
import CarVinImg from '@/assets/img/car-vin.gif'
import CarMamieImg from '@/assets/img/car-mamie.gif'

const Map = () => {
  const reqAnim = useRef(0)
  let [bgPos, setBgPos] = useState(0)
  let [bgSpeed] = useState(1)
  let [mamiePosX] = useState(15)
  let [dieselPosX] = useState(65)
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
          backgroundImage: `url(${VilleImg})`,
          backgroundPositionX: `${bgPos % 3000}%`
        }}
      >
        {/* <div className="trait-route"></div> */}
      </div>

      <div className='voitures'>
        {/* <div className="trait-route"></div> */}
        <div className='voiture-mamie' style={{ left: `${mamiePosX}vw` }}>
          <img src={CarMamieImg} alt='' draggable='false' />
        </div>

        <div className='voiture-diesel' style={{ left: `${dieselPosX}vw` }}>
          <img src={CarVinImg} alt='' draggable='false' />
        </div>
      </div>
    </div>
  )
}

export default Map
