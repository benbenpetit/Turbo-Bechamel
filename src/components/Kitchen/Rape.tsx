import RapeImg from '@/assets/img/rape.png'
import PlateImg from '@/assets/img/plate.png'
import { motion } from 'framer-motion'

const Rape = () => {
  const handleRapeDrag = (velocity: { x: number; y: number }) => {
    const absVelocity = Math.abs(velocity.x) + Math.abs(velocity.y)
    console.log(absVelocity / 10000)
    // setParmesan((prev: number) => prev + absVelocity / 10000)
  }

  return (
    <div className='rape'>
      <motion.img
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.3}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 12 }}
        className='grater'
        src={RapeImg}
        alt='Râpe à fromage'
        onDrag={(_, info) => handleRapeDrag(info.velocity)}
        draggable={false}
      />
      <img className='plate' src={PlateImg} alt='Plat' draggable={false} />
    </div>
  )
}

export default Rape
