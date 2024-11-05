import type { Metadata } from "next";
import CanonicalLink from "@/components/CanonicalLink";
import NavbarStyleTwo from "@/components/Layout/NavbarStyleTwo";
import PageTitle from "@/components/Common/PageTitle";
import ContactFormStyleTwo from "@/components/ContactUs/ContactFormStyleTwo";
import GoogleMap from "@/components/ContactUs/GoogleMap";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title:"Contact us",
  description: "Whether you have a question about our products, or need assistance with an order our team is here to help."

}
export default function Page() {
  return (
    <>
          <CanonicalLink url="/contact-us" />

      <NavbarStyleTwo />

      <PageTitle 
        title="Contact Us"
        homeText="Home"
        homeUrl="/"
      />

      <div className="ptb-100">
        <ContactFormStyleTwo />
      </div>

      <div className="pb-100">
        <GoogleMap />
      </div>
 
      <Footer />
    </>
  )
}
