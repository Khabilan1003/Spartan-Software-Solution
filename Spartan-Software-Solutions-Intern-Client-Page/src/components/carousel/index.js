// src/components/Carousel.js
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";

const Carousel = ({ bannerType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log(`http://localhost:5001/banners?query=${bannerType}`);
        const result = await axios.get(
          `http://localhost:5001/banners?query=${bannerType}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setBanners(result.data);
      } catch (error) {
        console.log(`Carousal ${bannerType} error : ${error}`);
      }
    };

    loadImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to automatically transition to next slide after 5 seconds
  const transitionNextSlide = () => {
    setTimeout(() => {
      nextSlide();
      transitionNextSlide(); // Recursive call to keep transitioning
    }, 5000);
  };

  // Start automatic slide transition when component mounts
  // This mimics the behavior of useEffect without using it
  transitionNextSlide();

  // If Banners are zero then dont show any layout
  if (banners.length == 0) return <></>;

  console.log(`Index : ${currentIndex}`);
  return (
    <div className={style.carousel_container}>
      <div className={style.carousel}>
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner.bannerImage}
            alt={`slide-${index}`}
            className={`${style.carousel_slide} ${
              index === currentIndex ? style.active : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
