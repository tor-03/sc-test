"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";

//import whiteLogo from "../../../public/images/white-logo.svg";
import logo from "/public/images/sc-logo.png";
import fontLogo from "/public/images/sc-black-font-logo.png";
// import NewsletterForm from "./NewsletterForm";

// Social Links
const socialLinksData = [
  {
    id: "1",
    name: "Facebook",
    link: "https://www.facebook.com/standard.carpets.pk",
  },
  {
    id: "2",
    name: "Instagram",
    link: "https://www.instagram.com/standardcarpets",
  },
  {
    id: "3",
    name: "Linkedin",
    link: "https://www.linkedin.com/company/standard-carpets",
  },
  {
    id: "4",
    name: "Twitter",
    link: "https://x.com/stcarpets",
  },
  {
    id: "5",
    name: "Pinterest",
    link: "https://www.pinterest.com/standardcarpets",
  },
];

// Page Links
const collections = [
  {
    id: "1",
    name: "Super Kazak",
    link: "/portfolio",
  },
  {
    id: "2",
    name: "Khorjeen",
    link: "/blog",
  },
  {
    id: "3",
    name: "Ushak",
    link: "/request-quote",
  },
  {
    id: "4",
    name: "Tribal",
    link: "/services",
  },
  {
    id: "5",
    name: "Vintage Tabraiz",
    link: "/services",
  },
];

const collection1 = [
  {
    id: "5",
    name: "Vintage Heriz",
    link: "/services",
  },
  {
    id: "1",
    name: "Gabbeh",
    link: "/portfolio",
  },
  {
    id: "2",
    name: "Barjasta",
    link: "/blog",
  },
  {
    id: "3",
    name: "Kazak",
    link: "/request-quote",
  },
  {
    id: "4",
    name: "Moroccon",
    link: "/services",
  },
];

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer-area pt-100 pb-75">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-4 col-sm-6"
              // data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="single-footer-widget">
                <div className="widget-logo">
                  <Link
                    className="navbar-brand"
                    href="/"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end'
                    }}
                  >
                    <Image
                      src={logo}
                      alt="Logo"
                      width={75}
                    />
                    <Image
                      src={fontLogo}
                      alt="Logo"
                      width={250}
                      style={{ marginBottom: '6px' }}
                    />
                  </Link>
                </div>
                <p>
                  Serving Since 1972<br />
                  Manufacturers of Hand-Knotted Rugs
                </p>
              </div>
            </div>

            <div className="col-lg-8 footer-links-container">
              <div className="single-footer-widget">
                <h3>Follow Us</h3>
                {socialLinksData && (
                  <ul className="social-link">
                    {socialLinksData.map((value, i) => (
                      <li key={i}>
                        <a href={value.link} target="_blank">
                          <i className="ri-arrow-right-line"></i> {value.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="single-footer-widget marg">
                <h3>Collections</h3>
                {collections && (
                  <ul className="quick-link">
                    {collections.map((value, i) => (
                      <li key={i}>
                        <Link
                          href={{
                            pathname: "/collections/",
                            query: { collectionName: value.name }
                          }}
                        >
                          {value.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="single-footer-widget">
                <h3 style={{ color: '#24231e' }}>.</h3>
                {collection1 && (
                  <ul className="quick-link">
                    {collection1.map((value, i) => (
                      <li key={i}>
                        <Link
                          href={{
                            pathname: "/collections/",
                            query: { collectionName: value.name }
                          }}
                        >
                          {value.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright-area">
        <div className="container">
          <div className="copyright-area-content">
            <p>
              Developed by {" "}
              <a href="https://www.truzak.com/" target="_blank">
                Truzak Technology Inc.
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-links-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          grid-gap: 20px;
        }

        @media (max-width: 767px) {
          .footer-links-container {
            display: flex;
            flex-wrap: wrap;
          }

          .marg{
            margin-left:25px
          }
        }

    
      `}</style>
    </>
  );
};

export default Footer;
