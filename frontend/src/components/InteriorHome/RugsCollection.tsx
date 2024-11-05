"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Masonry from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";

import { getTypesWithCarpet } from "@/api/API";

interface Carpet {
  id: string;
  image: string;
  title: string;
  link: string;
}

interface Type {
  name: string;
  description: string;
  position: number;
  coverImg: string | null;
}

const RugsCollection: React.FC = () => {
  const [carpetsData, setCarpetsData] = useState<Type[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchCarpets = async () => {
      try {
        const data = await getTypesWithCarpet(); 
        setCarpetsData(data);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch carpets data:", error);
      }
    };

    fetchCarpets();
    
  }, []);

  return (
    <>
      <div className="projects-area without-wrap-border ptb-100">
        <div className="container">
          <div
            style={{ marginBottom: "0px" }}
            className="section-title-wrap d-flex d-md-block d-xl-flex align-items-end justify-content-between"
          >
            <div className="title">
              <span>Collections</span>
              <h2>Explore Our Curated Collections, Each Crafted to Perfection</h2>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-once="true"
          >
            {carpetsData && (
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  300: 1,
                  576: 2,
                  768: 3,
                  992: 4,
                  1200: 5,
                }}
              >
                <Masonry>
                  {carpetsData.map((value, i) => (
                    <div className="card" key={i}>
                      <Link
                        href={{
                          pathname: "/collections/",
                          query: { collectionName: value.name },
                        }}
                      >
                        <div className="card-img-wrapper">
                          {value.coverImg ? (
                            <Image
                              src={`data:image/jpeg;base64,${value.coverImg}`}
                              alt={value.name}
                              width={300} // Adjust the width according to your design
                              height={300} // Adjust the height according to your design
                              style={{ objectFit: "cover" }}
                              className="card-img-top"
                            />
                          ) : (
                            <p>No Image Available</p>
                          )}
                        </div>
                      </Link>
                      <div className="card-body text-center">
                        <h5 className="card-title">{value.name}</h5>
                        <Link
                          className="nav-link"
                          style={{ color: "#ae8f6d" }}
                          href={{
                            pathname: "/collections/",
                            query: { collectionName: value.name },
                          }}
                        >
                          View Collection
                        </Link>
                      </div>
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          width: 90%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-top: 50px;
          transition: box-shadow 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 5px 10px rgba(33, 33, 33, 0.5);
        }

        .card-img-wrapper {
          width: 100%;
          height: 300px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-img-top {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 576px) {
          .card-img-wrapper {
            height: 480px;
          }
        }
      `}</style>
    </>
  );
};

export default RugsCollection;
