import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

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

interface PortfolioDetailsContentProps {
  data?: Collection | null;
}

const PortfolioDetailsContent: React.FC<PortfolioDetailsContentProps> = ({ data }) => {
  const [carpet, setCarpet] = useState<Collection | null>(data || null);

  useEffect(() => {
    if (data) {
      setCarpet(data);
    }
  }, [data]);

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
    <ProjectsDetailsArea>
      <div className="container">
        {carpet ? (
          <ContentWrapper>
            <MainContent>
              <div className="projects-details-image">
                <Image
                  src={`data:image/${guessImageType(carpet.img)};base64,${carpet.img}`}
                  alt="image" width={500} height={0} />
              </div>
            </MainContent>

            <SidebarWrapper>
              <div className="projects-details-side">
                <h3 style={{ marginBottom: '60px' }}>{carpet.type.name}</h3>
                <ul className="list">
                  <li>
                    <span>Construction</span>
                    <p>{carpet.construction}</p>
                  </li>
                  <li>
                    <span>Materials</span>
                    <p>{carpet.materials}</p>
                  </li>
                  <li>
                    <span>Origin</span>
                    <p>{carpet.origin}</p>
                  </li>
                </ul>
              </div>
            </SidebarWrapper>
          </ContentWrapper>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </ProjectsDetailsArea>
  );
};

const ProjectsDetailsArea = styled.div`
  padding-top: 100px;

  .projects-details-image {
    margin-bottom: 30px;
  }

  .projects-details-desc {
    margin-bottom: 30px;

    .box-content {
      margin-bottom: 30px;
    }

    .list {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;

        img {
          margin-right: 10px;
        }
      }
    }
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  .projects-details-image,
  .projects-details-desc {
    margin-bottom: 30px;
  }
`;

const SidebarWrapper = styled.div`
  .projects-details-side {
    h3 {
      margin-bottom: 20px;
    }

    .list {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        span {
          font-weight: bold;
        }

        h4 {
          margin: 0;
        }
      }
    }
  }
`;

export default PortfolioDetailsContent;
