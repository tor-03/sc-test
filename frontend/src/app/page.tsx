import NavbarStyleTwo from "@/components/Layout/NavbarStyleTwo";
import HeroBanner from "@/components/InteriorHome/HeroBanner";
import ClientsFeedbackSlider from "@/components/ArchitectureHome/ClientsFeedbackSlider";
import RugsCollection from "@/components/InteriorHome/RugsCollection";
import Footer from "@/components/Layout/Footer";

export default function Page() {
  return (
    <>
      <NavbarStyleTwo />

      <HeroBanner />
      <RugsCollection />

      <div className="section-area-with-line">
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <br></br>

        <ClientsFeedbackSlider />

      </div>


      <Footer />
    </>
  )
}
