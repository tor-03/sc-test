"use client"
import NavbarStyleTwo from "@/components/Layout/NavbarStyleTwo";
import PageTitle from "@/components/Common/PageTitle";
import Projects from "@/components/Portfolio/Projects";
import ContactFormStyleTwo from "@/components/ContactUs/ContactFormStyleTwo";
import Footer from "@/components/Layout/Footer";
import { useSearchParams } from "next/navigation";

export default function Page() {

  const searchParams = useSearchParams();
  const collectionName = searchParams.get("collectionName") || "Default Collection Name";
  return (
    <>
      <NavbarStyleTwo />

      <PageTitle
        title={collectionName}
        homeText="Home"
        homeUrl="/"
      />

      <Projects />

      <div className="pb-100">
        <ContactFormStyleTwo />
      </div>

      <Footer />
    </>
  );
}
