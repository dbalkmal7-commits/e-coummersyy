import getAllCategories from "@/app/api/getAllCategories";
import MySlider from "@/components/my slider/my-slider";
import Link from "next/link";
import React from "react";

export default async function CategorySlider() {
    const data = await getAllCategories();
    console.log(data);
    const dataimgs = data.map((categ)=> categ.image);
  return (
  <div className='w-[80%] mx-auto my-10'>
    <MySlider imglist={dataimgs} slidesPerView={7} />
    </div>
  );
}
