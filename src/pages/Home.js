import React, { useState } from "react";
import "./Home.css"

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  const [bubbles, setBubbles] = useState([]);

  const handleClick = (e) => {
    if (onClick) {
      onClick();
      // Add bubbles on click
      const newBubble = {
        id: Date.now(),
        x: e.clientX - 10,
        y: e.clientY - 10
      };
      setBubbles(prev => [...prev, newBubble]);
      // Remove bubble after animation
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 1500);
    }
  };

  return (
    <>
      <div className="nav-fish prev" onClick={handleClick} />
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="nav-fish-bubbles"
          style={{
            left: bubble.x + 'px',
            top: bubble.y + 'px'
          }}
        />
      ))}
    </>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  const [bubbles, setBubbles] = useState([]);

  const handleClick = (e) => {
    if (onClick) {
      onClick();
      // Add bubbles on click
      const newBubble = {
        id: Date.now(),
        x: e.clientX - 10,
        y: e.clientY - 10
      };
      setBubbles(prev => [...prev, newBubble]);
      // Remove bubble after animation
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 1500);
    }
  };

  return (
    <>
      <div className="nav-fish next" onClick={handleClick} />
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="nav-fish-bubbles"
          style={{
            left: bubble.x + 'px',
            top: bubble.y + 'px'
          }}
        />
      ))}
    </>
  );
};

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div className="home-container">
      {/* Bubble Background */}
      <div className="bubble-background">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bubble" />
        ))}
        <div className="light-rays" />
        <div className="water-overlay" />
        <div className="deep-particles" />
      </div>
      {/* Animated Background Elements */}
      
      {/* Tropical Fish */}
      <div className="tropical-fish" style={{ left: '10%', top: '20%' }}></div>
      <div className="tropical-fish" style={{ left: '30%', top: '40%' }}></div>
      <div className="tropical-fish" style={{ left: '50%', top: '60%' }}></div>
      <div className="tropical-fish" style={{ left: '70%', top: '30%' }}></div>
      <div className="tropical-fish" style={{ left: '90%', top: '70%' }}></div>

      {/* Ocean Bubbles */}
      <div className="ocean-bubble"></div>
      <div className="ocean-bubble"></div>
      <div className="ocean-bubble"></div>
      <div className="ocean-bubble"></div>
      <div className="ocean-bubble"></div>

      {/* Seaweed */}
      <div className="seaweed" style={{ left: '10%' }}></div>
      <div className="seaweed" style={{ left: '30%' }}></div>
      <div className="seaweed" style={{ left: '50%' }}></div>
      <div className="seaweed" style={{ left: '70%' }}></div>
      <div className="seaweed" style={{ left: '90%' }}></div>

      {/* Coral */}
      <div className="coral"></div>

      {/* Bubble Container */}
      <div className="bubble-container">
        {[...Array(15)].map((_, index) => (
          <div key={index} className="bubble" style={{
            '--duration': `${Math.random() * 8 + 4}s`,
            '--delay': `${Math.random() * 2}s`,
            '--size': `${Math.random() * 40 + 20}px`,
            left: `${Math.random() * 100}%`
          }}></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Aquacart!</h1>
        
        <p className="text-xl mb-6">Discover a variety of fish and accessories for your aquarium! Aquacart is your one-stop shop for all things related to pet fish and aquarium supplies.</p>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Why Choose Aquacart?</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Wide Selection of Fish:</strong> From freshwater to saltwater, we offer a wide variety of fish to suit any aquarium setup.</li>
            <li><strong>Premium Aquarium Supplies:</strong> We provide everything you need to set up and maintain a thriving aquarium, including filters, decor, and more.</li>
            <li><strong>Quality & Care:</strong> Each fish is carefully sourced to ensure they are healthy and happy, ready to be a great addition to your aquarium.</li>
            <li><strong>Affordable Pricing:</strong> Get the best deals on fish and accessories without compromising on quality!</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">How Aquacart Works</h2>
          <p className="mb-4">Aquacart is simple to use! Here's how it works:</p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Browse through our collection of fish and aquarium supplies.</li>
            <li>Add your favorite products to your cart.</li>
            <li>Proceed to checkout and have your items delivered straight to your doorstep.</li>
          </ol>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-3">Ready to Start Your Aquarium Journey?</h2>
          <p className="text-lg mb-4">Join the Aquacart family today and transform your home into an aquatic paradise!</p>
          <button className="bg-green-600 hover:bg-green-800 text-white py-2 px-6 rounded-lg font-semibold text-xl">Start Shopping</button>
        </section>
      </div>
    </div>
  );
};

export default Home;
