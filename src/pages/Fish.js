import React, { useState, useEffect, useCallback } from "react";
import fish1 from "../assets/images/fish/guppy-5.jpg";
import fish2 from "../assets/images/fish/guppy-6.jpg";
import fish3 from "../assets/images/fish/guppy-7.jpg";
import fish4 from "../assets/images/fish/guppy-8.webp";
import "./fish.css"; // Link the creative CSS
import { Container } from '@mui/material';
import '../styles/aquaAnimations.css';

const Fish = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fishImages = [
    { src: fish1, alt: "Guppy Fish", title: "Guppy", description: "Colorful and vibrant fish." },
    { src: fish2, alt: "Betta Fish", title: "Betta", description: "A beautiful and aggressive fish." },
    { src: fish3, alt: "Goldfish", title: "Goldfish", description: "A classic pet fish for aquariums." },
    { src: fish4, alt: "Clownfish", title: "Clownfish", description: "Popular marine fish with an orange hue." }
  ];

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fishImages.length);
  }, [fishImages.length]);

  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000);
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [nextImage]);

  // Function to create multiple bubbles
  const createBubbles = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 2 + 4;
      
      return (
        <div
          key={i}
          className="air-bubble"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    });
  };

  // Function to create kelp strands
  const createKelp = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const left = (i * 20) + Math.random() * 10;
      const height = 150 + Math.random() * 100;
      const delay = Math.random() * 2;
      
      return (
        <div
          key={i}
          className="kelp"
          style={{
            left: `${left}px`,
            height: `${height}px`,
            animationDelay: `${delay}s`
          }}
        />
      );
    });
  };

  return (
    <div className="aqua-background">
      {/* Animated Background Elements */}
      <div className="water-ripple" />
      <div className="light-rays" />
      
      {/* Bubble Stream */}
      <div className="bubble-stream">
        {createBubbles(15)}
      </div>

      {/* Kelp Forest */}
      <div className="kelp-forest">
        {createKelp(8)}
      </div>

      {/* Main Content */}
      <Container className="aqua-content">
        <div className="container">
          <h1>Fish Collection</h1>
          <p>Browse our collection of unique and colorful fish.</p>

          {/* Image Carousel with Hover Effects */}
          <div className="image-gallery">
            <div className="image-container">
              {fishImages.map((fish, index) => (
                <div 
                  key={index} 
                  className={`image-item ${currentIndex === index ? "active" : ""}`}
                >
                  <img 
                    src={fish.src} 
                    alt={fish.alt} 
                    className="fish-image"
                  />
                  <div className="overlay">
                    <h2>{fish.title}</h2>
                    <p>{fish.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <button onClick={nextImage}>Next Image</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Fish;
