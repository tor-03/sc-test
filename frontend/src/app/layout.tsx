import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../public/css/animate.min.css";
import "remixicon/fonts/remixicon.css";
import "swiper/css/bundle";
import 'react-accessible-accordion/dist/fancy-example.css';
import "../../public/css/flaticon_astle.css";
import "../../public/css/navbar.css";
import "../../public/css/services-details.css";
import "../../public/css/portfolio-details.css";
import "../../public/css/blog-details.css";
import "../../public/css/footer.css";
// Globals Styles
import "../../public/css/style.css";
// Globals Responsive Styles
import "../../public/css/responsive.css";

import React, {ReactElement,ReactNode} from 'react'

import AosAnimation from "@/components/Layout/AosAnimation";
import BackToTop from "@/components/Layout/BackToTop";

import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { AuthProvider } from "@/AuthProvider";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {

    default: "Standard Carpets",
    template: "%s - Standard Carpets"
  },
  description: "Welcome to Standard Carpets, where tradition meets innovation.",
};

export default function RootLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <AuthProvider>
          {children}
          <AosAnimation />
          <BackToTop />
        </AuthProvider>
      </body>
    </html>
  );
}

