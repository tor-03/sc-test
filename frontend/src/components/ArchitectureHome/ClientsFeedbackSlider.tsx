"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import quoteIcon from "../../../public/images/client/quote.svg";
import shape1 from "../../../public/images/client/shape1.png";
import shape2 from "../../../public/images/client/shape2.png";

const clientsFeedbackData = [
  {
    id: "1",
    feedbackText:
      "Standard Carpets has been a reliable partner for our wholesale business. Their dedication to quality and timely deliveries has helped us build a strong reputation among our clients. The range and craftsmanship of their rugs are simply outstanding.",
    image: "/images/client/user1.png",
    name: "Jonathon Ronan",
    designation:"CEO of Prestige Imports",
  },
  {
    id: "2",
    feedbackText:
      "Collaborating with Standard Carpets has significantly enhanced our retail offerings. Their exquisite hand-knotted rugs have become a favorite among our customers. We appreciate their commitment to excellence and look forward to many more years of partnership.",
    image: "/images/client/user2.png",
    name: "Marie Willard",
    designation: "Owner of Home Elegance",
  },
  {
    id: "3",
    feedbackText:
      "As an importer of fine home goods, working with Standard Carpets has been a game-changer. Their beautiful and durable rugs have added immense value to our product line. The professional service and quality assurance they provide are truly exceptional.",
    image: "/images/client/user3.png",
    name: "Michael Lee",
    designation: "Director of Global Home Furnishings",
  }
];

const ClientsFeedbackSlider: React.FC = () => {
  return (
    <>
      <div className="client-area ptb-100">
        <div className="container">
        <div style={{ marginBottom: '0px' }} className="section-title-wrap d-flex d-md-block d-xl-flex align-items-end justify-content-between">
            <div className="title">
              <span>REVIEWS</span>
              <h2>Client Testimonials: They Speak About Their Experience with Us!</h2>
            </div>
          </div>

          {clientsFeedbackData && (
            <Swiper
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay, Pagination]}
              className="client-swiper"
            >
              {clientsFeedbackData &&
                clientsFeedbackData.map((value, i) => (
                  <SwiperSlide key={i}>
                    <div className="client-content">
                      <div className="icon">
                        <Image src={quoteIcon} alt="quote" width={56} height={56} />
                      </div>
                      <p style={{color:'grey'}}>{value.feedbackText}</p>

                      <div className="client-information">
                        {/* <div className="image">
                          <Image
                            src={value.image}
                            alt="image"
                            width={70}
                            height={70}
                          />
                        </div> */}
                        <div className="title">
                          <h3>{value.name}</h3>
                          <span>{value.designation}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>

        {/* Shape Images */}
        <div className="client-shape1">
          <Image src={shape1} alt="shape" width={88} height={125} />
        </div>
        <div className="client-shape2">
          <Image src={shape2} alt="shape" width={116} height={82} />
        </div>
      </div>
    </>
  );
};

export default ClientsFeedbackSlider;
