import {
  CSSProperties,
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'

interface Props {
  position: { x: number; y: number }
  basePosition: { x: number; y: number }
  isDragging?: boolean
  setIsDragging: (isDragging: boolean) => void
  children: ReactNode
  style?: CSSProperties
}

const DragItem: FC<Props> = ({
  position,
  basePosition,
  isDragging,
  setIsDragging,
  children,
  style
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [clickOffset, setClickOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: MouseEvent) => {
    const clientRect = ref.current?.getBoundingClientRect()
    const elementPosition = {
      x: clientRect?.left || 0,
      y: clientRect?.top || 0
    }
    setClickOffset({
      x: e.clientX - elementPosition.x,
      y: e.clientY - elementPosition.y
    })
    setIsDragging(true)
  }

  useEffect(() => {
    window.addEventListener('mouseup', () => setIsDragging(false))

    return () => {
      window.removeEventListener('mouseup', () => setIsDragging(false))
    }
  }, [setIsDragging])

  return (
    <div
      className='drag-item'
      ref={ref}
      style={{
        transform: `translate(${
          isDragging ? position.x - clickOffset.x : basePosition.x
        }px, ${isDragging ? position.y - clickOffset.y : basePosition.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        ...style
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  )
}

export default DragItem
