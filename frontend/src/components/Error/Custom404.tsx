"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import errorImg from "../../../public/images/error.png";

const Custom404: React.FC = () => {
  return (
    <>
      <div className="not-found-area ptb-100">
        <div className="container">
          <div className="not-found-content text-center">
            <Image src={errorImg} alt="error-image" width={250} height={250} />

            <div style={{ maxWidth: '500px', margin: '0 auto 15px' }}>
              <h3>Oops! That page can&apos;t be found</h3>
              <p>
                The Page you are looking for is no longer availible
              </p>
            </div>

            <Link href="/" className="default-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
