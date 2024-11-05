"use client";

import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/api/API"; // Assuming this fetches collections based on typeId

const ITEMS_PER_PAGE = 15;

interface Collection {
  id: number;
  construction: string;
  materials: string;
  origin: string;
  rugId: string;
  imgSize: string;
  type: {
    id: number;
    name: string;
    description: string;
  };
  img?: string;
}

interface AllProjectsProps {
  typeId?: number;
}

const AllProjects: React.FC<AllProjectsProps> = ({ typeId }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      if (typeId) { // Ensure typeId is available
        console.log("Fetching collections for typeId: ", typeId);
        const data: Collection[] = await getCollections(typeId); // Fetch collections using the passed typeId
        setCollections(data);
        console.log("Fetched collections: ", data);
      }
    };

    fetchCollections();
  }, [typeId]); // Fetch collections whenever typeId changes

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever currentPage changes
  }, [currentPage]);

  if (!mounted) return null;

  // Pagination logic
  const totalPages = Math.ceil(collections.length / ITEMS_PER_PAGE);
  const currentItems = collections.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  function guessImageType(imageData: any) {
    if (!imageData) {
      return "jpeg"; 
    }
    const firstBytes = imageData.substr(0, 16);
    if (firstBytes.startsWith("ffd8")) {
      return "jpeg";
    }
    if (firstBytes.startsWith("89504e47")) {
      return "png";
    }
    return "jpeg";
  }
  

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="600"
        data-aos-once="true"
      >
        {collections.length > 0 ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              300: 1,
              576: 2,
              768: 3,
              992: 4,
              1200: 5,
            }}
          >
            <Masonry gutter="30px">
              {currentItems.map((value, i) => (
                <div className="card" key={i}>
                  <Link href={{
                    pathname: "/collections/collection-detail",
                    query: { collectionId: value.id }
                  }}>
                    <div className="card-img-wrapper">
                      <Image
                        //src={value.img || "/default-image.jpg"} // Use default image if img is missing
                        src={`data:image/${guessImageType(value.img)};base64,${value.img}`}
                        alt={value.type.name}
                        width={300}
                        height={300}
                        style={{ objectFit: "cover" }}
                        className="card-img-top"
                      />
                    </div>
                  </Link>
                  <div className="card-body text-center">
                    <h5 className="card-title">{value.type.name}</h5>
                    <Link className="quick-link" style={{ color: '#ae8f6d' }} href={{
                      pathname: "/collections/collection-detail",
                      query: { collectionId: value.id }
                    }}>
                      View Detail
                    </Link>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <h4>No collections found.</h4>
        )}
      </div>

      {/* Pagination Controls */}
      {collections.length > ITEMS_PER_PAGE && (
        <div className="pagination-controls">
          <button
            className="btn btn-outline-secondary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={{ width: '77px' }}
            className="btn btn-outline-secondary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <style jsx>{`
        .card {
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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

        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
        }

        .pagination-controls button {
          margin: 0 10px;
          padding: 5px 10px;
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

export default AllProjects;
