"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AllProjects from "./AllProjects";
import { getTypeWithName } from "@/api/API";

interface Types {
  id: number;
  name: string;
  description: string;
  position: string;
}

const Projects: React.FC = () => {
  const searchParams = useSearchParams();
  const collectionName = searchParams.get("collectionName");
  const [type, setType] = useState<Types | null>(null); // Initialize with null

  useEffect(() => {
    const fetchType = async () => {
      if (collectionName) { // Ensure collectionName is not null
        const data: Types = await getTypeWithName(collectionName);
        setType(data);
        console.log("Type with name : ", data);
      }
    };

    fetchType();
  }, [collectionName]); // Add collectionName as a dependency

  const displayTitle = type?.name === 'Super Kazak' ? 'S. KAZAK' : type?.name?.toUpperCase();

  return (
    <>
      <div className="projects-area without-wrap-border ptb-100">
        <div className="container">
          <div className="section-title-wrap d-flex d-md-block d-xl-flex align-items-end justify-content-between">
            <div className="title">
              <span>{displayTitle}</span>
              <h2>{type?.description}</h2>
            </div>
          </div>

          <div>
            {type?.id && <AllProjects typeId={type.id} />} {/* Pass type ID only when available */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
