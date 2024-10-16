import React, { useState } from "react";

import Carousel from "./Carousel";
const ImageSlide = () => {
  const slides = [
    "https://unsplash.it/640/425?image=30",
    "https://unsplash.it/640/425?image=40",
    "https://unsplash.it/640/425?image=50",
  ];

  return (
    <div className="flex justify-center items-center h-full bg-black">
      <div className="max-w-lg">
        <Carousel autoSlide={true}>
          {[
            ...slides.map((s, index) => (
              <img className="h-full" key={index} src={s} />
            )),
          ]}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageSlide;
