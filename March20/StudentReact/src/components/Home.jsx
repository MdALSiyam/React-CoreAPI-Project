import React from "react";
import bgImage from "../assets/Gallery.jpg"; // Ensure correct path

const Home = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "auto", // Keeps the image at its actual size
        backgroundPosition: "center", // Adjust position if needed
        backgroundRepeat: "no-repeat", // Prevents tiling
        // width: "150vw",
        height: "80vh", // Ensure enough space for image
        margin: "10px",
        overflow: "hidden", // Prevents scrolling if image is too big
      }}
    >
      <h2 style={{ color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.6)", marginTop: "150px", marginRight: "100px",}}>
        Welcome to Art Gallery
      </h2>
    </div>
  );
};

export default Home;
