import { AnimatePresence } from 'framer-motion'
import EcraseTomate from './components/Kitchen/EcraseTomate'
import Foodtruck from './components/Kitchen/Foodtruck'
import Marmite from './components/Kitchen/Marmite'
import Mamie from './components/Modal/Mamie'
import Map from './components/UI/Map'
import { CSSProperties, createRef, useEffect, useRef, useState } from 'react'
import CuisineImg from '@/assets/img/cuisine.png'
import { WindowSizeContext } from '@/contexts/WindowSize'
// import Rape from '@/components/Kitchen/Rape'
// import Couteau from '@/components/Kitchen/Couteau'
// import DragItem from '@/components/DragItem'
// import Planche from '@/components/Kitchen/Planche'
// import TomatoesImg from '@/assets/img/tomatoes.jpeg'
// import TomatoImg from '@/assets/img/tomato.png'
// import Plat from '@/components/Kitchen/Plat'
// import Tomate from '@/components/Kitchen/Tomates/Tomate'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    left: 0,
    top: 0
  })
  const screenFirstRef = useRef<HTMLDivElement>(null)
  const screenSecondRef = useRef<HTMLDivElement>(null)

  const lasagnaPlateRef = useRef<HTMLDivElement>(null)
  const [lasagnaPlateSize] = useState({
    width: 200,
    height: 200
  })
  const [lasagnaPlatePosition] = useState({
    x: 500 - lasagnaPlateSize.width / 2,
    y: 200 - lasagnaPlateSize.height / 2
  })

  const cuttingPlateRef = useRef<HTMLDivElement>(null)
  const [cuttingPlateSize, setCuttingPlateSize] = useState({
    width: 100,
    height: 100
  })
  const [cuttingPlatePosition] = useState({
    x: 500 - cuttingPlateSize.width / 2,
    y: 100 - cuttingPlateSize.height / 2
  })

  type TypeReserve = {
    id: number
    type: string
    position: { x: number; y: number }
    size: { width: number; height: number }
    widthPercent: number
  }

  const [reserves, setReserves] = useState<TypeReserve[]>([
    {
      id: 4,
      type: 'tomato',
      position: { x: 50, y: 400 },
      size: { width: 0, height: 0 },
      widthPercent: 10
    },
    {
      id: 5,
      type: 'onion',
      position: { x: 150, y: 400 },
      size: { width: 0, height: 0 },
      widthPercent: 5
    }
  ])

  type TypeIngredient = {
    id: number
    type: string
    position: { x: number; y: number }
    isCut: boolean
    isDragged: boolean
  }

  const [ingredients, setIngredients] = useState<TypeIngredient[]>([])

  const reservesRefs = useRef<any>(
    reserves.reduce((acc, reserve) => {
      acc[reserve.id] = createRef()
      return acc
    }, {})
  )

  const handleIngredientDrag = (
    id: number,
    newPosition: { x: number; y: number },
    isCut: boolean
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, position: newPosition, isCut }
          : ingredient
      )
    )
  }

  const handleReserveClick = (id: number, type: string) => {
    const reserveRect = reservesRefs.current[id].current.getBoundingClientRect()
    const reserveCenterPosition = getCenterPosition(
      { x: reserveRect.x, y: reserveRect.y },
      { width: reserveRect.width, height: reserveRect.height }
    )
    const newIngredient = {
      id: Math.floor(Math.random() * 10000000000),
      type: type,
      position: reserveCenterPosition,
      isCut: false,
      isDragged: true
    }

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient])

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      handleIngredientDrag(newIngredient.id, newPosition, newIngredient.isCut)
    }

    document.addEventListener('mousemove', handleMouseMove)

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mouseup', handleMouseUp)
  }

  const getCenterPosition = (
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) => {
    return {
      x: position.x + size.width / 2,
      y: position.y + size.height / 2
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const handleResize = () => {
      // Update lasagna plate size
      const rect = cuttingPlateRef?.current?.getBoundingClientRect()
      setCuttingPlateSize({
        width: rect?.width || 0,
        height: rect?.height || 0
      })

      // Update reserves size
      setReserves((prevReserves) => {
        return prevReserves.map((reserve) => {
          const { widthPercent } = reserve
          const newSize = {
            width: windowDimensions.width * (widthPercent / 100),
            height: windowDimensions.height * (widthPercent / 100)
          }

          return {
            ...reserve,
            size: newSize
          }
        })
      })

      // Update window dimensions
      const ratio = 16 / 9
      const isWidthBigger = window.innerWidth / window.innerHeight > ratio
      const isHeightBigger = window.innerWidth / window.innerHeight < ratio
      const padding = 60

      const width = isWidthBigger
        ? window.innerHeight * ratio
        : window.innerWidth - padding
      const height = isHeightBigger
        ? window.innerWidth / ratio
        : window.innerHeight - padding
      const left = isWidthBigger ? (window.innerWidth - width) / 2 : padding / 2
      const top = isHeightBigger
        ? (window.innerHeight - height) / 2
        : padding / 2

      setWindowDimensions({
        width,
        height,
        left,
        top
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleIngredientMouseUp = () => {
      const ingredient = ingredients.find((ingredient) => ingredient.isDragged)!
      if (!ingredient) return

      const getIsInsideLasagna = (rect: DOMRect) => {
        return (
          ingredient.position.x > rect.x &&
          ingredient.position.x < rect.x + rect.width &&
          ingredient.position.y > rect.y &&
          ingredient.position.y < rect.y + rect.height
        )
      }

      const lasagnaPlateRect = lasagnaPlateRef.current?.getBoundingClientRect()
      const isInsideLasagna = getIsInsideLasagna(lasagnaPlateRect!)

      if (!ingredient.isCut && isInsideLasagna) {
        setIngredients((prevIngredients) =>
          prevIngredients.map((prevIngredient) =>
            prevIngredient.id === ingredient.id
              ? {
                  ...prevIngredient,
                  isDragged: false,
                  position: getCenterPosition(
                    lasagnaPlatePosition,
                    lasagnaPlateSize
                  )
                }
              : prevIngredient
          )
        )
      } else {
        setIngredients((prevIngredients) =>
          prevIngredients.map((prevIngredient) =>
            prevIngredient.id === ingredient.id
              ? {
                  ...prevIngredient,
                  isDragged: false,
                  position: getCenterPosition(
                    cuttingPlatePosition,
                    cuttingPlateSize
                  )
                }
              : prevIngredient
          )
        )
      }
    }

    window.addEventListener('mouseup', handleIngredientMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleIngredientMouseUp)
    }
  }, [
    ingredients,
    cuttingPlatePosition,
    cuttingPlateSize,
    lasagnaPlatePosition,
    lasagnaPlateSize
  ])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const renderIngredient = (item: TypeIngredient) => {
    const ingredientStyle = {
      top: item.position.y,
      left: item.position.x
    }

    return (
      <div
        key={item.id}
        className={`ingredient ${item.type} ${item.isCut ? 'cut' : ''}`}
        style={{ position: 'absolute', ...ingredientStyle }}
        draggable
        onDrag={(e) => {
          const newPosition = { x: e.clientX, y: e.clientY }
          handleIngredientDrag(item.id, newPosition, item.isCut)
        }}
      >
        {item.type}
      </div>
    )
  }

  const renderReserve = (item: TypeReserve) => {
    const reserveStyle = {
      top: item.position.y,
      left: item.position.x,
      width: `${item.size.width}px`,
      // height: `${item.size.height}px`
      height: 'auto',
      backgroundColor: 'red'
    }

    return (
      <div
        key={item.id}
        className={`ingredient reserve ${item.type}`}
        style={reserveStyle}
        ref={reservesRefs.current[item.id]}
        onMouseDown={() => {
          handleReserveClick(item.id, item.type)
        }}
      >
        reserve: {item.type}
      </div>
    )
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      style={Object.assign(
        {
          width: windowDimensions.width,
          height: windowDimensions.height,
          left: windowDimensions.left,
          top: windowDimensions.top
        },
        {
          '--vw': windowDimensions.width / 100 + 'px',
          '--vh': windowDimensions.height / 100 + 'px'
        } as CSSProperties
      )}
    >
      <WindowSizeContext.Provider
        value={{
          width: windowDimensions.width,
          height: windowDimensions.height
        }}
      >
        <div ref={screenFirstRef} className='screen first'>
          <div
            className='plat'
            style={{
              top: lasagnaPlatePosition.y,
              left: lasagnaPlatePosition.x,
              width: `${lasagnaPlateSize.width}px`,
              height: `${lasagnaPlateSize.height}px`
            }}
            ref={lasagnaPlateRef}
          >
            lasagnaPlateRef
          </div>
          <div
            className='planche'
            style={{
              top: cuttingPlatePosition.y,
              left: cuttingPlatePosition.x,
              width: `${cuttingPlateSize.width}px`,
              height: `${cuttingPlateSize.height}px`
            }}
            ref={cuttingPlateRef}
          >
            cuttingPlateRef
          </div>
          <div className='reserves' style={{ position: 'absolute', zIndex: 3 }}>
            {reserves.map((item) => {
              switch (item.type) {
                case 'tomato':
                case 'onion':
                case 'cheese':
                  return renderReserve(item)
                default:
                  return null
              }
            })}
          </div>
          <div
            className='ingredients'
            style={{ position: 'absolute', zIndex: 4 }}
          >
            {ingredients.map((item) => {
              switch (item.type) {
                case 'tomato':
                case 'onion':
                case 'cheese':
                  return renderIngredient(item)
                default:
                  return null
              }
            })}
          </div>
        </div>
        <div ref={screenSecondRef} className='screen second'></div>
        <AnimatePresence>{isModalOpen && <Mamie />}</AnimatePresence>
        <Map />
        <img className='background' src={CuisineImg} alt='Cusine' />
      </WindowSizeContext.Provider>
    </main>
  )
}

export default App
