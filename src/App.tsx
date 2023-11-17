import { AnimatePresence } from 'framer-motion'
import EcraseTomate from './components/Kitchen/EcraseTomate'
import Foodtruck from './components/Kitchen/Foodtruck'
import Marmite from './components/Kitchen/Marmite'
import Mamie from './components/Modal/Mamie'
import Map from './components/UI/Map'
import { CSSProperties, createRef, useEffect, useRef, useState } from 'react'
import CuisineImg from '@/assets/img/cuisine.png'
import PlancheImg from '@/assets/img/planche.png'
import { WindowSizeContext } from '@/contexts/WindowSize'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/all'
import Footer from './components/UI/Footer'
import Kitchen from '@/assets/img/cuisine.png'
import Home from './components/UI/Home'
import TV from './components/UI/TV'
import { Howl, Howler } from 'howler'
// import Rape from '@/components/Kitchen/Rape'
// import Couteau from '@/components/Kitchen/Couteau'
// import DragItem from '@/components/DragItem'
// import Planche from '@/components/Kitchen/Planche'
// import TomatoesImg from '@/assets/img/tomatoes.jpeg'
// import TomatoImg from '@/assets/img/tomato.png'
// import Plat from '@/components/Kitchen/Plat'
// import Tomate from '@/components/Kitchen/Tomates/Tomate'

gsap.registerPlugin(ScrollToPlugin)

type TypeReserve = {
  id: number
  type: string
  position: { x: number; y: number }
  positionPercent: { x: number; y: number }
  size: { width: number; height: number }
  widthPercent: number
}

type TypeIngredient = {
  id: number
  type: string
  position: { x: number; y: number }
  positionPercent: { x: number; y: number }
  size: { width: number; height: number }
  widthPercent: number
  isCut: boolean
  cutIndex: number
  isDragged: boolean
}

type TypeWeapon = {
  id: number
  type: string
  position: { x: number; y: number }
  positionPercent: { x: number; y: number }
  basePosition: { x: number; y: number }
  basePositionPercent: { x: number; y: number }
  size: { width: number; height: number }
  widthPercent: number
  isGrabbed: boolean
}

const App = () => {
  const mainRef = useRef<HTMLElement>(null)
  const insideRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRight, setIsRight] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    left: 0,
    top: 0
  })

  const cuttingPlateRef = useRef<HTMLDivElement>(null)
  const [cuttingPlatePosition, setCuttingPlatePosition] = useState({
    position: { x: 0, y: 0 },
    positionPercent: { x: 44, y: 42 },
    size: { width: 0, height: 0 },
    widthPercent: 22
  })

  const lasagnaPlateRef = useRef<HTMLDivElement>(null)
  const [lasagnaPlatePosition, setLasagnaPlatePosition] = useState({
    position: { x: 0, y: 0 },
    positionPercent: { x: 70, y: 42 },
    size: { width: 0, height: 0 },
    widthPercent: 24
  })

  const [cuttingPlateIngredientId, setCuttingPlateIngredientId] = useState<
    number | null
  >(null)

  const [selectedWeapon, setSelectedWeapon] = useState<TypeWeapon | null>(null)

  const [lasagnaIngredients, setLasagnaIngredients] = useState<
    TypeIngredient[]
  >([])

  const [reserves, setReserves] = useState<TypeReserve[]>([
    {
      id: Math.floor(Math.random() * 10000000000),
      type: 'tomate',
      position: { x: 0, y: 0 },
      positionPercent: { x: 21, y: 31 },
      size: { width: 0, height: 0 },
      widthPercent: 14
    },
    {
      id: Math.floor(Math.random() * 10000000000),
      type: 'oignon',
      position: { x: 0, y: 0 },
      positionPercent: { x: 2, y: 32 },
      size: { width: 0, height: 0 },
      widthPercent: 14
    },
    {
      id: Math.floor(Math.random() * 10000000000),
      type: 'ail',
      position: { x: 0, y: 0 },
      positionPercent: { x: 11, y: 42 },
      size: { width: 0, height: 0 },
      widthPercent: 16
    }
  ])

  const [ingredients, setIngredients] = useState<TypeIngredient[]>([])

  const reservesRefs = useRef<any>(
    reserves.reduce((acc, reserve) => {
      acc[reserve.id] = createRef()
      return acc
    }, {})
  )

  const [weapons, setWeapons] = useState<TypeWeapon[]>([
    {
      id: Math.floor(Math.random() * 10000000000),
      type: 'portal',
      position: { x: 0, y: 0 },
      positionPercent: { x: 56, y: 12 },
      basePosition: { x: 0, y: 0 },
      basePositionPercent: { x: 56, y: 12 },
      size: { width: 0, height: 0 },
      widthPercent: 16,
      isGrabbed: false
    },
    {
      id: Math.floor(Math.random() * 10000000000),
      type: 'double',
      position: { x: 0, y: 0 },
      positionPercent: { x: 64, y: 14 },
      basePosition: { x: 0, y: 0 },
      basePositionPercent: { x: 64, y: 14 },
      size: { width: 0, height: 0 },
      widthPercent: 16,
      isGrabbed: false
    }
  ])

  const [weaponsArea, setWeaponsArea] = useState({
    position: { x: 0, y: 0 },
    positionPercent: { x: 55, y: 6 },
    size: { width: 0, height: 0 },
    sizePercents: { width: 60, height: 30 }
  })

  const isInWeaponsArea = (mousePos: { x: number; y: number }) => {
    const { position, size } = weaponsArea
    const { x, y } = mousePos

    return (
      x > position.x &&
      x < position.x + size.width &&
      y > position.y &&
      y < position.y + size.height
    )
  }

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

  const handleIngredientClick = (id: number, type: string) => {
    const ingredient = ingredients.find((ingredient) => ingredient.id === id)!
    if (!ingredient) return
    if (ingredient.isCut) return

    setIngredients((prevIngredients) =>
      prevIngredients.map((prevIngredient) =>
        prevIngredient.id === id
          ? {
              ...prevIngredient,
              isCut: prevIngredient.cutIndex + 1 >= 2,
              cutIndex: prevIngredient.cutIndex + 1
            }
          : prevIngredient
      )
    )
  }

  const handleReserveClick = (id: number, type: string) => {
    const reserve = reserves.find((reserve) => reserve.id === id)!
    if (!reserve) return

    const reserveCenterPosition = getCenterPosition(
      { x: reserve.position.x, y: reserve.position.y },
      { width: reserve.size.width, height: reserve.size.height }
    )

    const reserveCenterPositionPercent = {
      x: (reserveCenterPosition.x / windowDimensions.width) * 100,
      y: (reserveCenterPosition.y / windowDimensions.height) * 100
    }

    const widthPercent = 8
    const size = {
      width: windowDimensions.width * (widthPercent / 100),
      height: windowDimensions.height * (widthPercent / 100)
    }

    const newIngredient: TypeIngredient = {
      id: Math.floor(Math.random() * 10000000000),
      type: type,
      position: reserveCenterPosition,
      positionPercent: reserveCenterPositionPercent,
      size: size,
      widthPercent: widthPercent,
      isCut: false,
      cutIndex: 0,
      isDragged: true
    }

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient])

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: e.clientX - newIngredient.size.width / 2 - windowDimensions.left,
        y: e.clientY - newIngredient.size.height / 2 - windowDimensions.top
      }
      handleIngredientDrag(newIngredient.id, newPosition, newIngredient.isCut)
    }

    document.addEventListener('mousemove', handleMouseMove)

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleWeaponClick = (id: number, type: string) => {
    const weapon = weapons.find((weapon) => weapon.id === id)!
    if (!weapon) return

    if (!selectedWeapon) {
      setTimeout(() => {
        setWeapons((prevWeapons) =>
          prevWeapons.map((prevWeapon) =>
            prevWeapon.id === weapon.id
              ? { ...prevWeapon, isGrabbed: true }
              : prevWeapon
          )
        )
        setSelectedWeapon(weapon)
      }, 50)
    }
  }

  useEffect(() => {
    if (!selectedWeapon) return

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: e.clientX - selectedWeapon.size.width / 2 - windowDimensions.left,
        y: e.clientY - selectedWeapon.size.height / 2 - windowDimensions.top
      }
      setWeapons((prevWeapons) =>
        prevWeapons.map((prevWeapon) =>
          prevWeapon.id === selectedWeapon.id
            ? {
                ...prevWeapon,
                position: newPosition
              }
            : prevWeapon
        )
      )
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [selectedWeapon])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const mousePos = {
        x:
          e.clientX -
          windowDimensions.left +
          (isRight ? windowDimensions.width * 45 : 0),
        y: e.clientY - windowDimensions.top
      }

      if (selectedWeapon) {
        const isInsideWeaponsArea = isInWeaponsArea(mousePos)

        if (isInsideWeaponsArea) {
          setSelectedWeapon(null)
          setWeapons((prevWeapons) =>
            prevWeapons.map((prevWeapon) =>
              prevWeapon.id === selectedWeapon.id
                ? {
                    ...prevWeapon,
                    isGrabbed: false,
                    position: prevWeapon.basePosition,
                    positionPercent: prevWeapon.basePositionPercent
                  }
                : prevWeapon
            )
          )
        }
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [windowDimensions, selectedWeapon])

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
      // Update weapons area size
      setWeaponsArea((prevWeaponsArea) => {
        const newPosition = {
          x: windowDimensions.width * (prevWeaponsArea.positionPercent.x / 100),
          y: windowDimensions.height * (prevWeaponsArea.positionPercent.y / 100)
        }

        const newSize = {
          width:
            windowDimensions.width * (prevWeaponsArea.sizePercents.width / 100),
          height:
            windowDimensions.height *
            (prevWeaponsArea.sizePercents.height / 100)
        }

        return {
          ...prevWeaponsArea,
          position: newPosition,
          size: newSize
        }
      })

      // Update lasagna plate size
      setLasagnaPlatePosition((prevLasagnaPlatePosition) => {
        const computedHeight =
          lasagnaPlateRef.current?.getBoundingClientRect().height

        const newPosition = {
          x:
            windowDimensions.width *
            (prevLasagnaPlatePosition.positionPercent.x / 100),
          y:
            windowDimensions.height *
            (prevLasagnaPlatePosition.positionPercent.y / 100)
        }

        const newSize = {
          width:
            windowDimensions.width *
            (prevLasagnaPlatePosition.widthPercent / 100),
          height: computedHeight ? computedHeight : 0
        }

        return {
          ...prevLasagnaPlatePosition,
          position: newPosition,
          size: newSize
        }
      })

      setCuttingPlatePosition((prevCuttingPlatePosition) => {
        const computedHeight =
          cuttingPlateRef.current?.getBoundingClientRect().height

        const newPosition = {
          x:
            windowDimensions.width *
            (prevCuttingPlatePosition.positionPercent.x / 100),
          y:
            windowDimensions.height *
            (prevCuttingPlatePosition.positionPercent.y / 100)
        }

        const newSize = {
          width:
            windowDimensions.width *
            (prevCuttingPlatePosition.widthPercent / 100),
          height: computedHeight ? computedHeight : 0
        }

        return {
          ...prevCuttingPlatePosition,
          position: newPosition,
          size: newSize
        }
      })

      // Update reserves size
      setReserves((prevReserves) => {
        return prevReserves.map((reserve) => {
          const computedHeight =
            reservesRefs.current[reserve.id].current?.getBoundingClientRect()
              .height

          const { positionPercent } = reserve
          const newPosition = {
            x: windowDimensions.width * (positionPercent.x / 100),
            y: windowDimensions.height * (positionPercent.y / 100)
          }

          const { widthPercent } = reserve
          const newSize = {
            width: windowDimensions.width * (widthPercent / 100),
            height: computedHeight
          }

          return {
            ...reserve,
            position: newPosition,
            size: newSize
          }
        })
      })

      // Update ingredients size
      setIngredients((prevIngredients) => {
        return prevIngredients.map((ingredient) => {
          const ingredientEl = document.querySelector(
            `[data-id='${ingredient.id}']`
          ) as HTMLElement

          if (!ingredientEl) return ingredient

          const computedHeight = ingredientEl.getBoundingClientRect().height

          const { positionPercent } = ingredient
          const newPosition = {
            x: windowDimensions.width * (positionPercent.x / 100),
            y: windowDimensions.height * (positionPercent.y / 100)
          }

          const { widthPercent } = ingredient
          const newSize = {
            width: windowDimensions.width * (widthPercent / 100),
            height: computedHeight
          }

          return {
            ...ingredient,
            position: newPosition,
            size: newSize
          }
        })
      })

      // Update weapons size
      setWeapons((prevWeapons) => {
        return prevWeapons.map((weapon) => {
          const { positionPercent } = weapon
          const newPosition = {
            x: windowDimensions.width * (positionPercent.x / 100),
            y: windowDimensions.height * (positionPercent.y / 100)
          }

          const { widthPercent } = weapon
          const newSize = {
            width: windowDimensions.width * (widthPercent / 100),
            height: 0
          }

          const newBasePosition = {
            x: windowDimensions.width * (weapon.basePositionPercent.x / 100),
            y: windowDimensions.height * (weapon.basePositionPercent.y / 100)
          }

          return {
            ...weapon,
            position: newPosition,
            size: newSize,
            basePosition: newBasePosition
          }
        })
      })

      // Update window dimensions
      const ratio = 16 / 9
      const padding = 60
      const isWidthBigger = window.innerWidth / window.innerHeight > ratio
      const isHeightBigger = window.innerWidth / window.innerHeight < ratio

      const width = isWidthBigger
        ? window.innerHeight * ratio - padding * ratio
        : window.innerWidth - padding
      const height = isHeightBigger
        ? window.innerWidth / ratio - padding / ratio
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
  }, [windowDimensions.width, windowDimensions.height])

  useEffect(() => {
    const handleIngredientMouseUp = () => {
      const ingredient = ingredients.find((ingredient) => ingredient.isDragged)!
      if (!ingredient) return

      const getIsInsideElement = (specs: {
        x: number
        y: number
        width: number
        height: number
      }) => {
        return (
          ingredient.position.x + ingredient.size.width / 2 > specs.x &&
          ingredient.position.x + ingredient.size.width / 2 <
            specs.x + specs.width &&
          ingredient.position.y + ingredient.size.height / 2 > specs.y &&
          ingredient.position.y + ingredient.size.height / 2 <
            specs.y + specs.height
        )
      }

      const isInsideLasagna = getIsInsideElement({
        x: lasagnaPlatePosition.position.x,
        y: lasagnaPlatePosition.position.y,
        width: lasagnaPlatePosition.size.width,
        height: lasagnaPlatePosition.size.height
      })

      const isInsideCuttingPlate = getIsInsideElement({
        x: cuttingPlatePosition.position.x,
        y: cuttingPlatePosition.position.y,
        width: cuttingPlatePosition.size.width,
        height: cuttingPlatePosition.size.height
      })

      const handleSetIngredients = (
        position: { x: number; y: number },
        size: { width: number; height: number }
      ) => {
        const center = getCenterPosition(position, size)
        const ingredientEl = document.querySelector(
          `[data-id='${ingredient.id}']`
        ) as HTMLElement
        const computedHeight = ingredientEl.getBoundingClientRect().height

        const newPositionPercent = {
          x:
            ((center.x - ingredient.size.width / 2) / windowDimensions.width) *
            100,
          y: ((center.y - computedHeight / 2) / windowDimensions.height) * 100
        }

        const newPosition = {
          x: center.x - ingredient.size.width / 2,
          y: center.y - computedHeight / 2
        }

        setIngredients((prevIngredients) =>
          prevIngredients.map((prevIngredient) =>
            prevIngredient.id === ingredient.id
              ? {
                  ...prevIngredient,
                  isDragged: false,
                  positionPercent: newPositionPercent,
                  position: newPosition
                }
              : prevIngredient
          )
        )
      }

      if (!ingredient.isCut && isInsideLasagna) {
        handleSetIngredients(
          lasagnaPlatePosition.position,
          lasagnaPlatePosition.size
        )
      } else if (
        !ingredient.isCut &&
        isInsideCuttingPlate &&
        !cuttingPlateIngredientId
      ) {
        setCuttingPlateIngredientId(ingredient.id)
        handleSetIngredients(
          cuttingPlatePosition.position,
          cuttingPlatePosition.size
        )
      } else {
        setIngredients((prevIngredients) =>
          prevIngredients.filter(
            (prevIngredient) => prevIngredient.id !== ingredient.id
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
    lasagnaPlatePosition,
    lasagnaPlatePosition
  ])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const getImageUrl = (x: string) => {
    return new URL(`/src/assets/img/${x}`, import.meta.url).href
  }

  const renderIngredient = (item: TypeIngredient) => {
    const ingredientStyle = {
      top: item.position.y,
      left: item.position.x,
      width: `${item.size.width}px`,
      height: 'auto'
    }

    const steps = 3
    const imageUrls = Array.from(Array(steps).keys()).map((index) =>
      getImageUrl(`ingredients/${item.type}_${index}.png`)
    )

    return (
      <div
        key={item.id}
        className={`ingredient ${item.type}`}
        data-id={item.id}
        style={{
          position: 'absolute',
          ...ingredientStyle
        }}
        draggable={false}
        onDrag={(e) => {
          const newPosition = { x: e.clientX, y: e.clientY }
          handleIngredientDrag(item.id, newPosition, item.isCut)
        }}
        onClick={() => {
          handleIngredientClick(item.id, item.type)
        }}
      >
        <img
          src={imageUrls[item.cutIndex]}
          className='ingredient-img'
          style={{ width: '100%', height: 'auto', display: 'block' }}
          draggable={false}
        />
      </div>
    )
  }

  const renderReserve = (item: TypeReserve) => {
    const reserveStyle = {
      top: item.position.y,
      left: item.position.x,
      width: `${item.size.width}px`,
      height: 'auto'
    }

    const imageUrl = getImageUrl(`reserves/${item.type}_bol.png`)

    return (
      <div
        key={item.id}
        className={`reserve ${item.type}`}
        style={{ position: 'absolute', ...reserveStyle }}
        ref={reservesRefs.current[item.id]}
        onMouseDown={() => {
          handleReserveClick(item.id, item.type)
        }}
      >
        <img
          src={imageUrl}
          className='bol'
          style={{ width: '100%', height: 'auto', display: 'block' }}
          draggable={false}
        />
      </div>
    )
  }

  const [isGameStarted, setIsGameStarted] = useState(false)

  const menuSound = new Howl({
    src: ['src/assets/sounds/music/goofy-prod.mp3'],
    loop: true
  })

  useEffect(() => {
    menuSound.play()
  }, [])

  const gameSound = new Howl({
    src: ['src/assets/sounds/music/jazz-loop.mp3']
  })

  const clickSoundButton = (isSoundActive) => {
    !isSoundActive ? Howler.mute(false) : Howler.mute(true)
  }

  // const [isLoadingStart, setIsLoadingStart] = useState(false);

  const startGame = () => {
    setIsGameStarted(true)
    menuSound.mute()
    gameSound.play()

    // startProgressBar();
    // setIsLoadingStart(true);
  }

  // useEffect(() => {
  //   startGame()
  // }, [isLoadingStart]);

  const renderWeapon = (item: TypeWeapon) => {
    const weaponStyle = {
      top: item.position.y,
      left: item.position.x,
      width: `${item.size.width}px`,
      height: 'auto',
      transition: 'transform 0.225s cubic-bezier(0.4, 0, 0, 1)'
    }

    const transformStyle = {
      transform: `rotate(${item.isGrabbed ? -35 : 90}deg)`
    }

    const imageUrl = getImageUrl(`weapons/${item.type}.png`)

    return (
      <div
        key={item.id}
        className={`weapon ${item.type}`}
        style={{
          position: 'absolute',
          ...transformStyle,
          ...weaponStyle
        }}
        onMouseDown={() => handleWeaponClick(item.id, item.type)}
      >
        <img
          src={imageUrl}
          className='bol'
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
          draggable={false}
        />
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
        <div
          className='inside'
          ref={insideRef}
          onClick={() => {
            // gsap.to(insideRef.current, {
            //   onStart: () => {
            //     setIsRight(!isRight)
            //   },
            //   duration: 0.6,
            //   ease: 'power4.easeOut',
            //   scrollTo: {
            //     x: isRight ? 0 : (windowDimensions.width * 45) / 100
            //   }
            // })
          }}
        >
          <div className='inside-wrapper'>
            <div
              className='planche'
              style={{
                top: cuttingPlatePosition.position.y,
                left: cuttingPlatePosition.position.x,
                width: `${cuttingPlatePosition.size.width}px`,
                height: 'auto'
              }}
              ref={cuttingPlateRef}
            >
              <img
                src={PlancheImg}
                alt='Planche'
                style={{ width: '100%', height: 'auto', display: 'block' }}
                draggable={false}
              />
            </div>
            <div
              className='plat'
              style={{
                left: lasagnaPlatePosition.position.x,
                top: lasagnaPlatePosition.position.y,
                width: `${lasagnaPlatePosition.size.width}px`,
                height: 'auto'
              }}
              ref={lasagnaPlateRef}
            >
              <img
                src={PlancheImg}
                alt='Lasagnes'
                style={{ width: '100%', height: 'auto', display: 'block' }}
                draggable={false}
              />
            </div>
            <div
              className='reserves'
              style={{ position: 'absolute', zIndex: 3 }}
            >
              {reserves.map((item) => renderReserve(item))}
            </div>
            <div
              className='ingredients'
              style={{ position: 'absolute', zIndex: 4 }}
            >
              {ingredients.map((item) => renderIngredient(item))}
            </div>
            <div
              className='weapons'
              style={{ position: 'absolute', zIndex: 4 }}
            >
              {weapons.map((item) => renderWeapon(item))}
            </div>
            <img className='background' src={CuisineImg} alt='Cusine' />
          </div>
        </div>
        {!isGameStarted && (
          <Home
            windowWidth={windowDimensions.width}
            windowHeight={windowDimensions.height}
          />
        )}
        <Footer
          footerStart={() => {
            startGame()
          }}
          footerSound={(isSoundActive: boolean) => {
            clickSoundButton(isSoundActive)
          }}
        />
        <TV />
      </WindowSizeContext.Provider>
    </main>
  )
}

export default App
