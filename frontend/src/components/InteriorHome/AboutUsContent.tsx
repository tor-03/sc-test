"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import aboutImg from "../../../public/images/about/about3.jpg";
import arrowIcon from "../../../public/images/about/arrow2.svg";

const AboutUsContent: React.FC = () => {
  return (
    <>
      <div className="about-area pb-100">
        <div className="container">
          <div
            className="row justify-content-center align-items-center" 
          >
            <div className="col-lg-5 col-md-12">
              <div 
                className="about-image-two"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="600"
                data-aos-once="true"
              >
                <Image src={aboutImg} alt="about" width={800} height={950} />
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div 
                className="about-two-content"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="600"
                data-aos-once="true"
              >
                <span>ABOUT US</span>
                <h2>
                    Achieve Comfort and Affordability with Standard Carpets
                </h2>
                <p>
                We produce and stock a diverse range of oriental and contemporary carpets, catering to traditional, transitional, and modern tastes. Our unwavering commitment to quality and customer satisfaction sets us apart in the industry.
                </p>

                <ul className="list">
                  <li>
                    <Image src={arrowIcon} alt="arrow" width={28} height={10} />
                    Comfort underfoot, every step
                  </li>
                  <li>
                    <Image src={arrowIcon} alt="arrow" width={28} height={10} />
                    Wide variety of collections
                   
                  </li>
                  <li>
                    <Image src={arrowIcon} alt="arrow" width={28} height={10} /> 
                    Committed to customer satisfaction

                    
                  </li>
                  <li>
                    <Image src={arrowIcon} alt="arrow" width={28} height={10} />
                    Trusted service since 1972
                  
                  </li>
                </ul>

                <div className="about-btn">
                  <Link href="/about-us" className="default-btn">
                    Know More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsContent;
