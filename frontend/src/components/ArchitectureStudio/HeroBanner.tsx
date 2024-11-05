"use client";

import React from "react";
import Link from "next/link";
import ReactCompareImage from "react-compare-image";

const HeroBanner: React.FC = () => {
  return (
    <>
      <div className="as-banner-area">
        <div className="container-fluid">
          <div className="as-banner-image">
            <ReactCompareImage
              leftImage="/images/main-banner/as-banner-after.jpg"
              rightImage="/images/main-banner/as-banner-before.jpg"
            />
          </div>

          <div 
            className="as-banner-content"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-once="false"
          >
            <h1>
            <b>Crafting</b> Timeless Elegance in Every <b>Knot</b>
            </h1>
          </div>

          <div className="as-banner-bottom-content d-flex align-items-center justify-content-between">
            <p style={{maxWidth:'100%'}}>
            Welcome to Standard Carpets, where tradition meets innovation. Based in the heart of Lahore, Pakistan, we specialize in handmade rugs that embody quality, craftsmanship, and contemporary elegance. Discover our extensive range of Traditional, Transitional, and Contemporary rugs designed to enhance any living space.
            </p>
            {/* <Link href="/portfolio">SEE CASE STUDIES</Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
