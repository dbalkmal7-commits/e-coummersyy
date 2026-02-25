"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

type SliderProps = {
  imglist: string[];
  slidesPerView?: number;
};
export default function MySlider({ imglist, slidesPerView = 1 }: SliderProps) {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={slidesPerView}
      pagination={{clickable:true}}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Autoplay, Pagination]}
      autoplay={{delay:3000}}
    >
      {imglist.map((src,ind)=>{
        return(
            <SwiperSlide key={ind}>

        <Image src={src} 
        width={300} 
          height={100}
        className='w-full h-75' 
        alt="slider image 1" />

      </SwiperSlide>
        )
      })}
    
     
    </Swiper>                   

    
  )
}
