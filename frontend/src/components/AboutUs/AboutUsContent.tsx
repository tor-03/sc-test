"use client";

import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import aboutImg from "../../../public/images/about/carpet5.jpg";
import videoThumb from "../../../public/images/about/award.jpg";

const AboutUsContent: React.FC = () => {
  // To open the lightbox change the value of the "toggler" prop.
  const [toggler, setToggler] = useState<boolean>(false);

  return (
    <>
 

      <FsLightbox
        toggler={toggler}
        sources={[
          "https://www.youtube.com/embed/sVi2pdF1aIc?si=wuP0-H9KuJnEk0Js",
        ]}
      />

      <div className="about-area pt-100">
        <div className="container">
          <div className="about-three-title">
            <span>ABOUT US</span>
            <h2>
              <b>Standard Carpets</b> Handcrafting Excellence and Heritage Since 1972
            </h2>
          </div>

          <div className="about-image-three">
            <Image src={aboutImg} alt="image" width={1320} height={430} />
          </div>

          <div className="about-three-inner">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-12">
                <div className="about-three-left-content">
                  <h2 style={{ fontWeight: "425", fontSize: "39px", marginTop: "-0.10rem" }}>
                    Mission and Vision
                  </h2>
                  <p className="mb-0" style={{ marginTop: "1.34rem" }}>
                    Our mission is to create exquisite hand-knotted rugs that bring warmth and elegance to homes around the world. We envision Standard Carpets as a leader in the industry, known for our dedication to quality, innovation, and sustainable practices.
                  </p>

                  <div className="about-image-wrap">
                    <Image src={videoThumb} alt="image" width={1052} height={1120} />
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="about-three-right-content">
                  <div className="about-wrap-content" style={{ marginTop: "-0.17rem" }}>
                    <h2>Our Story</h2>
                    <p className="mb-0">
                      Standard Carpets is a quality-conscious hand-knotted rugs manufacturing company based in Lahore, Pakistan. Founded by Mr. Razi Uddin Sheikh in 1972, what began as a small factory in the suburbs of Lahore has grown into a leading manufacturer of exquisite hand-knotted oriental and contemporary carpets. As a second-generation family business, we carry a rich heritage of craftsmanship, producing and stocking a diverse range of rugs that cater to traditional, transitional, and contemporary tastes. Our commitment to quality and customer satisfaction sets us apart in the industry.
                    </p>
                  </div>
                  <div className="about-wrap-content" style={{ marginTop: "70px" }}>
                    <h2>Quality Commitment</h2>
                    <p>
                      At Standard Carpets, quality is our top priority. Each rug undergoes rigorous quality control checks to ensure it meets our high standards. We use only the finest materials and traditional techniques to produce rugs that are both beautiful and durable. Our meticulous craftsmanship and attention to detail ensure that each carpet is a masterpiece, reflecting our dedication to excellence and customer satisfaction.
                    </p>
                  </div>
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
