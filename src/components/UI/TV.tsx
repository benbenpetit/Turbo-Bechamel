import TVAvif from '@/assets/img/TV.avif'
import TVWebp from '@/assets/img/TV.webp'
import TVPNG from '@/assets/img/TV.png'

const TV = () => {
  return (
    <div className='tv'>
      <picture>
        <source srcSet={TVAvif} type='image/avif' />
        <source srcSet={TVWebp} type='image/webp' />
        <source srcSet={TVPNG} type='image/png' />
        <img src={TVPNG} alt='' draggable='false' fetchpriority='high' />
      </picture>
    </div>
  )
}

export default TV
