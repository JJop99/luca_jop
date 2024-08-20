import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFade, Autoplay, Navigation } from "swiper";
import Image from "next/image";


export default function Carousel(props) {
    
  return (
    <>
      <Swiper
        autoHeight={true}
        loop={true}
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Navigation]}
      >
        {props.images.map(
          (image) => (
            (
              <SwiperSlide key={image.key}>
                <div className="object-fill w-full ">
                  <Image 
                    alt={image.image}
                    key={image.key} 
                    src={"/"+image.image} 
                    layout="responsive" // Responsive resizing
                    width={800}  // Aspect ratio width
                    height={600}
                  />
                </div>
              </SwiperSlide>
            )
          )
        )}
      </Swiper>
    </>
  );
}
