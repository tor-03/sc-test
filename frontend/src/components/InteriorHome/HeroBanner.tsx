"use client";

import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import Link from "next/link";
import Image from "next/image";

import bannerBgImg2 from "../../../public/images/about/carpet1.jpg";
// import arrowRightIcon from "../../../public/images/main-banner/arrow-right.svg";

// Social Links
const socialLinksData = [
  {
    id: "1",
    icon: "ri-facebook-line",
    link: "https://www.facebook.com/",
  },
  {
    id: "2",
    icon: "ri-instagram-line",
    link: "https://www.instagram.com/",
  },
  {
    id: "3",
    icon: "ri-twitter-x-line",
    link: "https://www.twitter.com/",
    
  },
  {
    id: "4",
    icon: "ri-linkedin-line",
    link: "https://www.linkedin.com/",
},
];

const HeroBanner: React.FC = () => {
  const [toggler, setToggler] = useState<boolean>(false);

  return (
    <>
      {/* Use here youtube Embed video link */}
      <FsLightbox
        toggler={toggler}
        sources={[
          "https://www.youtube.com/embed/sVi2pdF1aIc?si=wuP0-H9KuJnEk0Js",
        ]}
      />

      <div className="main-banner-area" style={{ position: 'relative', overflow: 'hidden' }}>
        <Image
          src={bannerBgImg2}
          alt="banner"
          layout="fill"
          objectFit="cover"
          style={{ position: 'absolute', zIndex: '-1' }}
        />
        <div className="container-fluid">
          <div className="main-banner-content">
            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="600"
              data-aos-once="false"
            >
              Crafting Timeless Elegance in Every Knot
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="600"
              data-aos-once="false"
            >
              Welcome to Standard Carpets, where tradition meets innovation. Based in the heart of Lahore, Pakistan, we specialize in Hand-Knotted rugs that embody quality, craftsmanship, and contemporary elegance. Discover our extensive range of Traditional, Transitional, and Contemporary rugs designed to enhance any living space.
            </p>
            <div
              className="banner-btn"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="600"
              data-aos-once="false"
            >
              <Link style={{marginTop:'50px'}} href="/contact-us" className="default-btn">
                Connect with Our Team
              </Link>
            </div>
          </div>
        </div>

        {/* {socialLinksData && (
          <ul className="main-banner-social">
            {socialLinksData.map((value, i) => (
              <li key={i}>
                <a href={value.link} target="_blank">
                  <i className={value.icon}></i>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="main-banner-arrow">
          <Link href="/contact-us">
            <Image src={arrowRightIcon} alt="arrow right" width={24} height={24} />
          </Link>
        </div>

        <ul className="main-banner-info">
          <li>
            <span style={{ color: 'white' }}>CALL : </span>
            <a style={{ color: 'white' }} href="tel:3214264567">+321 426 4567</a>
          </li>
          <li>
            <span style={{ color: 'white' }}>MAIL : </span>
            <a style={{ color: 'white' }} href="mailto:trazteam@gmail.com">trazteam@gmail.com</a>
          </li>
        </ul> */}
      </div>
    </>
  );
};

export default HeroBanner;
