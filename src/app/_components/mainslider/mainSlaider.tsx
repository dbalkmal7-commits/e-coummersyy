
import React from "react";

import img1 from "../../../../public/image/als-slider.webp"
import img2 from "../../../../public/image/als-slider.webp"
import img3 from "../../../../public/image/als-slider.webp"
import img4 from "../../../../public/image/als-slider.webp"
import Image from 'next/image';
import MySlider from '@/components/my slider/my-slider'


export default function MainSlider() {
  return (
    <div className='container w-[80%] mx-auto'>
       <div className='flex'>
         <div className='w-3/4'>
         <MySlider imglist={[img1.src, img2.src]} />
        </div>
        <div className='w-1/4'>
        <Image src={img3} className='h-[150] object-cover' alt="slider image 1" />
        <Image src={img4} className='h-[150] object-cover' alt="slider image 1" />
        </div>
       </div>
    </div>

  )
}
