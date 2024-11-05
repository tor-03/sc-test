"use client";

import React from "react";
// Social Links
const socialLinksData = [
  {
    id: "1",
    icon: "ri-facebook-line",
    link: "https://www.facebook.com/standard.carpets.pk",
  },
  {
    id: "2",
    icon: "ri-instagram-line",
    link: "https://www.instagram.com/standardcarpets",
  },
  {
    id: "3",
    icon: "ri-twitter-x-line",
    link: "https://x.com/stcarpets",
    
  },
  {
    id: "4",
    icon: "ri-linkedin-line",
    link: "https://www.linkedin.com/company/standard-carpets",
},
  {
    id: "5",
    icon: "ri-pinterest-line",
    link: "https://www.pinterest.com/standardcarpets",
},
];

const ContactInfo: React.FC = () => {
  return (
    <>
      <ul className="contact-info-list">
        <li>
          <span>LOCATION</span>
          Standard Carpets
          <br></br>
          25 Empress Road
          <br></br>
          Lahore, Punjab 54800, Pakistan

        </li>
        <li>
          <span>EMAIL</span>
          info@standard-carpets.com

        </li>
        <li>
          <span>PHONE</span>
          <a href="tel:+923214001255">+92 (321) 400-1255</a>
          <a href="tel:+924236303297">+92 (423) 630-3297</a>
        </li>


        <li>
          <span>SOCIAL MEDIA</span>

          {socialLinksData && (
            <ul className="social">
              {socialLinksData &&
                socialLinksData.map((value, i) => (
                  <li key={i}>
                    <a href={value.link} target="_blank">
                      <i className={value.icon}></i>
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </li>
      </ul>
    </>
  );
};

export default ContactInfo;
