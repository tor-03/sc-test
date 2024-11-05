"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const OurMissionAndVision: React.FC = () => {
  return (
    <>
      <Accordion
        preExpanded={["a"]}
        className="our-mission-and-vision-accordion"
      >
        <AccordionItem uuid="a">
          <AccordionItemHeading>
            <AccordionItemButton>Our Mission</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
            Our mission is to create exquisite handmade rugs that bring warmth and elegance to homes around the world.
            </p>
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem uuid="b">
          <AccordionItemHeading>
            <AccordionItemButton>Our Vision</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
            We envision Standard Carpets as a leader in the industry, known for our dedication to quality, innovation, and sustainable practices.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default OurMissionAndVision;
