import type { Metadata } from "next";
import CanonicalLink from "@/components/CanonicalLink";
import NavbarStyleTwo from "@/components/Layout/NavbarStyleTwo";
import PageTitle from "@/components/Common/PageTitle";
import AboutUsContent from "@/components/AboutUs/AboutUsContent";
// import LatestRecognition from "@/components/ArchitectureStudio/LatestRecognition";
import ClientsFeedbackSlider from "@/components/ArchitectureHome/ClientsFeedbackSlider";

import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title:"About us",
  description: " At Standard Carpets, quality is our top priority. Each rug undergoes rigorous quality control checks to ensure it meets our high standards. We use only the finest materials and traditional techniques to produce rugs that are both beautiful and durable. Our meticulous craftsmanship and attention to detail ensure that each carpet is a masterpiece, reflecting our dedication to excellence and customer satisfaction."

}
export default function Page() {

  
  return (
    <>
      <CanonicalLink url="/about-us" />
      <NavbarStyleTwo />

      <PageTitle 
        title="About Us"
        homeText="Home"
        homeUrl="/"
      />

      <AboutUsContent />

      {/* <LatestRecognition /> */}

      {/* <QuoteText /> */}

      <div className="ptb-100">
        <ClientsFeedbackSlider />
      </div>

      {/* <TextSlide /> */}

      {/* <TeamMemberStyle2 /> */}

      {/* <div className="pt-100">
        <Partner />
      </div> */}

      {/* <div className="pb-100">
        <ContactFormStyleTwo />
      </div> */}
      
      <Footer />
    </>
  )
}
