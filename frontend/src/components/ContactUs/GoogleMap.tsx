"use client";

import React from "react";

const GoogleMap: React.FC = () => {
  return (
    <>
      <div className="map-area">
        <div className="container">
          <iframe
            className="contact-map"
            src="https://maps.google.com/maps?q=Standard+Carpets,Lahore&hl=en&z=14&output=embed"
            aria-hidden="true">
          </iframe>
        </div>
      </div>
    </>
  );
};

export default GoogleMap;
