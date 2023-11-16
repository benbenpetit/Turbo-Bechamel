import { useEffect, useRef, useState } from "react"


const Foodtruck = () => {
    const reqAnim = useRef(0)
    let [bgPos, setBgPos] = useState(0)
    let [bgSpeed, setBgSpeed] = useState(3)

    const handleBgPos = () => {
        setBgPos((prev) => prev - bgSpeed)
        reqAnim.current = requestAnimationFrame(handleBgPos)
    }

    useEffect(() => {
        reqAnim.current = requestAnimationFrame(handleBgPos)
    }, [])

  return (
    <div 
    className='foodtruck'>
        <div className='background'
        style={{backgroundPositionX: `${bgPos}px`}}>
        </div>
        <div className='voiture'></div>
        </div>
  )
}

export default Foodtruck