import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
import i18n from 'i18next';
import { useEffect, useState } from 'react';


function Test () {

  const [swiper, setSwiper] = useState(null)
  useEffect(() => {
    if (swiper) {
      swiper.rtlTranslate = i18n?.dir() === 'rtl'
    }
  }, [swiper, i18n?.dir()])
    return (
        <Swiper
        className='bg-red-100 p-12 h-40   '
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        dir='rtl'
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </Swiper>
    )
}
export default Test;