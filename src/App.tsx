import { AnimatePresence } from "framer-motion"
import EcraseTomate from "./components/Kitchen/EcraseTomate"
import Foodtruck from "./components/Kitchen/Foodtruck"
import Marmite from "./components/Kitchen/Marmite"
import Mamie from "./components/Modal/Mamie"
import Map from "./components/UI/Map"

import { useState } from "react"

const App = () => {

let [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <>
      {/* <Marmite/>
      <EcraseTomate/>
      <Foodtruck/> */}
      <AnimatePresence>{isModalOpen && <Mamie/>}</AnimatePresence>
      <Map/>
      {/* <button style={{zIndex:100, position:"absolute"}} onClick={()=>{setIsModalOpen(!isModalOpen)}}></button> */}
    </>
  )
}

export default App
