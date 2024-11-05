"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { getCollections } from "@/api/API";

interface Collection {
  id: number;
  construction: string;
  materials: string;
  origin: string;
  rugId: string;
  imgSize: string
  type: {
    id: number;
    name: string;
    description: string;
  };
  img?: string;
}

interface ProjectGalleryProps {
  typeId?: number;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ typeId }) => {
  const [galleryImages, setGalleryImages] = useState<Collection[]>([]);
  const [carpetTitle, setCarpetTitle] = useState<string>("");
  console.log("Type ID : ", typeId)

  useEffect(() => {
    const fetchCollections = async () => {
      const data: Collection[] = await getCollections(typeId);
      console.log("Fetching Collection ", data);
      setGalleryImages(data);
    };

    fetchCollections();
  }, []);

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
      <div className="projects-gallery-area">
        <div className="container">
          <h2 className="title">Related Products</h2>

          <Swiper
            spaceBetween={25}
            loop={true}
            autoHeight={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay]}
            className="projects-gallery-slide-swiper"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={`data:image/${guessImageType(image.img)};base64,${image.img}`}
                  alt={`image-${index}`} width={320} height={400} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProjectGallery;
