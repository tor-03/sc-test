"use client";

import React, { useState, useEffect } from "react";
import { useRouter,usePathname } from 'next/navigation';
import {
  Accordion
} from "react-accessible-accordion";
import Link from "next/link";
import Image from "next/image";

import logo from "/public/images/sc-logo.png";
import fontLogo from "/public/images/sc-font-logo.png";
// import blackLogo from "/public/images/black-logo.svg";
import { useAuth } from "@/AuthProvider";

const NavbarStyleThree: React.FC = () => {
  const currentRoute = usePathname();

  const [menu] = useState<boolean>(true);
  const {logout} = useAuth();
  const router = useRouter();

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        elementId?.classList.add("sticky");
      } else {
        elementId?.classList.remove("sticky");
      }
    });
  }, []);

  const classOne: string = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo: string = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  // SearchModal
  const [isActive, setActive] = useState<boolean>(false);
  const handleToggleSearchModal = () => {
    setActive(!isActive);
  };


  // Mobile Menu
  const [isMobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const handleToggleMobileMenu = () => {
    setMobileMenuActive(!isMobileMenuActive);
  };;

  const logoutUser = () => {
    logout(); 
    window.location.href = '/login'; 
};

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-with-different-color" id="navbar">
        <div className="container-fluid position-relative">
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
              width={70}
            />
            <Image
              src={fontLogo}
              alt="Logo"
              width={230}
              style={{ marginBottom: '6px' }}
            />
          </Link>



          {/* Toggle navigation */}
          <button
            className={classTwo}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggleMobileMenu}
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>

          {/* Menu For Desktop Device */}
          <div className={classOne} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  href="#"
                  onClick={logoutUser}
                //className={`nav-link ${currentRoute === "/collection-types/" ? "active" : ""}`}
                >
                  <i className="ri-logout-box-line"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* For Mobile Device */}
      <div
        className={`modal mobile-menu-modal ${isMobileMenuActive ? "show" : ""
          }`}
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <div>
                <Image src={logo} alt="Logo" width={30} /><Image src={fontLogo} alt="Logo" width={150} />
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleToggleMobileMenu}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <div className="modal-body">
              <Accordion allowZeroExpanded>


                <Link
                  href="/dashboard"
                  className={`nav-link ${currentRoute === "/dashboard/" ? "active" : ""
                    }`}
                >
                  Collections
                </Link>

                <Link
                  href="/collection-types/"
                  className={`nav-link ${currentRoute === "/collection-types/" ? "active" : ""
                    }`}
                >
                  Types
                </Link>

              </Accordion>
            </div>
          </div>
        </div>

        <div className="close-overlay" onClick={handleToggleMobileMenu}></div>
      </div>

      {/* Search Form */}
      <div className={`modal search-modal-area ${isActive ? "show" : ""}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleToggleSearchModal}
            >
              <i className="ri-close-line"></i>
            </button>
            <div className="modal-body">
              <div className="search-form">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                  />
                  <button type="submit">
                    <i className="ri-search-line"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="close-overlay" onClick={handleToggleSearchModal}></div>
      </div>
    </>
  );
};

export default NavbarStyleThree;
