 import { FC } from 'react';
 import { Swiper, SwiperSlide } from 'swiper/react';
 import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
//  import 'swiper/swiper-bundle.min.css';
 import '../../../node_modules/swiper/swiper-bundle.min.css';
 import s from './Slider.module.scss';
 
 type MySwiperProps = {
   images: string[];
 };
 
 const MySwiper: FC<MySwiperProps> = ({images}) => {
 
  
 
  
    return (
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt='' className={s.swiper_img}/>
          </SwiperSlide>
        ))}
      </Swiper>
      
      
      
      
      
      // <div className="swiper-container">
      //   <div className="swiper-wrapper">
      //     {images.map((image, index) => (
      //       <div key={index} className="swiper-slide">
      //         <img src={image} alt={`Image ${index}`} />
      //       </div>
      //     ))}
      //   </div>
      //   <div className="swiper-button-next"></div>
      //   <div className="swiper-button-prev"></div>
      // </div>
    );
   
 };
 
 export default MySwiper; 
  
