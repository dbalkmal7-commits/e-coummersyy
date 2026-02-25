import getAllCategories from "@/app/api/getAllCategories";
import MySlider from "@/components/my slider/my-slider";
import React from "react";

export default async function CategorySlider() {
  const data = await getAllCategories();
  const dataimgs = data.map((categ) => categ.image);

  return (
    <div className="container mx-auto w-full px-3 md:px-0 md:w-[80%] my-10">
      <MySlider imglist={dataimgs} slidesPerView={3} />
    </div>
  );
}
