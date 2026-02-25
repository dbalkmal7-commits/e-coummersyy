
import React from "react";

import img1 from "../../../../public/image/als-slider.webp";
import img2 from "../../../../public/image/als-slider.webp";
import img3 from "../../../../public/image/als-slider.webp";
import img4 from "../../../../public/image/als-slider.webp";
import Image from "next/image";
import MySlider from "@/components/my slider/my-slider";

export default function MainSlider() {
  return (
    <div className="container mx-auto w-full px-3 md:px-0 md:w-[80%]">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        {/* السلايدر الرئيسي */}
        <div className="w-full md:w-3/4">
          <div className="h-40 sm:h-52 md:h-64 lg:h-72">
            <MySlider imglist={[img1.src, img2.src]} />
          </div>
        </div>
        {/* الصور الجانبية */}
        <div className="w-full md:w-1/4 flex md:flex-col gap-3">
          <div className="relative flex-1 h-32 sm:h-40 md:h-1/2">
            <Image
              src={img3}
              fill
              className="object-cover rounded-lg"
              alt="slider image 1"
            />
          </div>
          <div className="relative flex-1 h-32 sm:h-40 md:h-1/2">
            <Image
              src={img4}
              fill
              className="object-cover rounded-lg"
              alt="slider image 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
