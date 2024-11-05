"use client";
import { useEffect, useState } from "react";
import NavbarStyleTwo from "@/components/Layout/NavbarStyleTwo";
import PortfolioDetailsContent from "@/components/PortfolioDetails/PortfolioDetailsContent";
import ContactFormStyleTwo from "@/components/ContactUs/ContactFormStyleTwo";
import Footer from "@/components/Layout/Footer";
import ProjectGallery from "@/components/PortfolioDetails/ProjectGallery";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import collectionsData from '../../../data/collections-data.json';
import { MouseEvent } from 'react';
import { getCarpet } from "@/api/API";

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


export default function Page() {
  const searchParams = useSearchParams();
  const carpetId = searchParams.get("collectionId");
  const router = useRouter();
  const [carpet, setCarpet] = useState<Collection | null>(null); 
  const collection = collectionsData.find(item => item.id === carpetId);
  let collectionName = collection ? collection.title : "Default Collection Name";

  const [fallbackUrl, setFallbackUrl] = useState('/');

  useEffect(() => {
    // Update fallbackUrl to the appropriate fallback URL if needed
    setFallbackUrl('/');
  }, []);

  useEffect(() => {
    const fetchCollection = async () => {
      const data: Collection = await getCarpet(carpetId);
      console.log("Fetching Collection ", data);
      setCarpet(data);
    };

    fetchCollection();
  }, []);

  const handleBackClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <>
      <NavbarStyleTwo />

      <div className="page-banner-area">
        <div className="container-fluid">
          <div className="page-banner-inner">
            <ul className="list text-uppercase">
              <li>
                <Link href='/' className="text-black hover:text-[#717FF8]">
                  Home
                </Link>
              </li>
              <li>
                <Link href='#' onClick={handleBackClick} className="text-black hover:text-[#717FF8]">
                  {carpet?.type.name}
                </Link>
              </li>
              <li>{carpet?.type.name} {carpet?.id}</li>
            </ul>
          </div>
        </div>
      </div>

      <PortfolioDetailsContent data={carpet ?? undefined}/>

      <ProjectGallery typeId={carpet?.type.id}/>

      <div className="ptb-100">
        <ContactFormStyleTwo />
      </div>

      <Footer />
    </>
  );
}
