import Rape from '@/components/Kitchen/Rape'
import Kitchen from '@/assets/img/kitchen.jpg'
import { useRef, useState } from 'react'

const App = () => {
  const [isDown, setIsDown] = useState(false)
  const screenFirstRef = useRef<HTMLDivElement>(null)
  const screenSecondRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setIsDown(!isDown)
    window.scrollTo({
      top: (isDown ? 0 : screenSecondRef.current?.offsetHeight) || 0,
      behavior: 'smooth'
    })
  }

  return (
    <main onClick={handleScroll}>
      <div ref={screenFirstRef} className='screen first'>
        <Rape />
      </div>
      <div ref={screenSecondRef} className='screen second'></div>
      <img className='background' src={Kitchen} alt='Cusine' />
    </main>
  )
}

export default App
