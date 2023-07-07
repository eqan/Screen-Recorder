/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Link from "next/link";
import { StyleClass } from "primereact/styleclass";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Divider } from "primereact/divider";
import AppConfig from "../layout/AppConfig";
import { NodeRef, Page } from "../types/types";
import { classNames } from "primereact/utils";

const LandingPage: Page = () => {
  const [isHidden, setIsHidden] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

  const toggleMenuItemClick = () => {
    setIsHidden((prevState) => !prevState);
  };

  return (
    <div className="surface-0 flex justify-content-center">
      <div id="home" className="landing-wrapper overflow-hidden">
        <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
          <Link href="/" className="flex align-items-center">
            <img
              src={`/layout/images/${"logo-white"}.svg`}
              alt="SDXL Logo"
              height="50"
              className="mr-0 lg:mr-2"
            />
            <span className="text-900 font-medium text-2xl line-height-3 mr-8">
              SDXL
            </span>
          </Link>
          <StyleClass
            nodeRef={menuRef as NodeRef}
            selector="@next"
            enterClassName="hidden"
            leaveToClassName="hidden"
            hideOnOutsideClick
          >
            <i
              ref={menuRef}
              className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-700"
            ></i>
          </StyleClass>
          <div
            className={classNames(
              "align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2",
              { hidden: isHidden }
            )}
            style={{ top: "100%" }}
          >
            <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
              <li>
                <a
                  href="#home"
                  onClick={toggleMenuItemClick}
                  className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                >
                  <span>Home</span>
                  <Ripple />
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={toggleMenuItemClick}
                  className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                >
                  <span>Features</span>
                  <Ripple />
                </a>
              </li>
              <li>
                <a
                  href="#highlights"
                  onClick={toggleMenuItemClick}
                  className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                >
                  <span>Highlights</span>
                  <Ripple />
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={toggleMenuItemClick}
                  className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                >
                  <span>Pricing</span>
                  <Ripple />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          id="hero"
          className="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%)",
            clipPath: "ellipse(150% 87% at 93% 13%)",
          }}
        >
          <div className="mx-4 md:mx-8 mt-0 md:mt-4">
            <h1 className="text-6xl font-bold text-gray-900 line-height-2">
              <span className="font-light block">
                Welcome to the future of visual creativity!
              </span>
              Introducing Stable Diffusion SDXL 0.9: Unleashing AI-Powered
              Visual Innovation
            </h1>
            <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">
              Brace yourself for a sneak peek into the world of limitless
              creative possibilities that SDXL 0.9 brings to industries spanning
              film, television, music, design, and manufacturing.
            </p>
          </div>
          <div className="flex justify-content-center md:justify-content-end">
            <img
              src="/demo/images/landing/screen-1.png"
              alt="Hero Image"
              className="w-3 md:w-auto"
            />
          </div>
        </div>

        <div id="highlights" className="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
          <div className="grid mt-8 pb-2 md:pb-8">
            <div
              className="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0"
              style={{ borderRadius: "8px" }}
            >
              <img
                src="/demo/images/landing/mockup.svg"
                className="w-11"
                alt="mockup mobile"
              />
            </div>

            <div className="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
              <div
                className="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end"
                style={{
                  width: "4.2rem",
                  height: "4.2rem",
                  borderRadius: "10px",
                }}
              >
                <i className="pi pi-fw pi-mobile text-5xl text-purple-700"></i>
              </div>
              <h2 className="line-height-1 text-900 text-4xl font-normal">
                Unparalleled Image Quality
              </h2>
              <span
                className="text-700 text-2xl line-height-3 ml-0 md:ml-2"
                style={{ maxWidth: "650px" }}
              >
                SDXL 0.9 raises the bar for image quality, pushing the
                boundaries of what AI-generated visuals can achieve.
              </span>
            </div>
          </div>

          <div className="grid my-8 pt-2 md:pt-8">
            <div className="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
              <div
                className="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start"
                style={{
                  width: "4.2rem",
                  height: "4.2rem",
                  borderRadius: "10px",
                }}
              >
                <i className="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>
              </div>
              <h2 className="line-height-1 text-900 text-4xl font-normal">
                Revolutionary Composition Capabilities:
              </h2>
              <span
                className="text-700 text-2xl line-height-3 mr-0 md:mr-2"
                style={{ maxWidth: "650px" }}
              >
                With SDXL 0.9, creativity knows no bounds. Explore an array of
                innovative composition tools that empower you to craft visually
                compelling scenes with ease.
              </span>
            </div>

            <div
              className="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0"
              style={{ borderRadius: "8px" }}
            >
              <img
                src="/demo/images/landing/mockup-desktop.svg"
                className="w-11"
                alt="mockup"
              />
            </div>
          </div>
          <div className="grid mt-8 pb-2 md:pb-8">
            <div
              className="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0"
              style={{ borderRadius: "8px" }}
            >
              <img
                src="/demo/images/landing/mockup.svg"
                className="w-11"
                alt="mockup mobile"
              />
            </div>

            <div className="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
              <div
                className="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end"
                style={{
                  width: "4.2rem",
                  height: "4.2rem",
                  borderRadius: "10px",
                }}
              >
                <i className="pi pi-fw pi-mobile text-5xl text-purple-700"></i>
              </div>
              <h2 className="line-height-1 text-900 text-4xl font-normal">
                Enhanced Performance
              </h2>
              <span
                className="text-700 text-2xl line-height-3 ml-0 md:ml-2"
                style={{ maxWidth: "650px" }}
              >
                We've supercharged the engine behind SDXL 0.9, ensuring
                lightning-fast generation times without compromising quality.
              </span>
            </div>
          </div>
          <div className="grid my-8 pt-2 md:pt-8">
            <div className="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
              <div
                className="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start"
                style={{
                  width: "4.2rem",
                  height: "4.2rem",
                  borderRadius: "10px",
                }}
              >
                <i className="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>
              </div>
              <h2 className="line-height-1 text-900 text-4xl font-normal">
                Transforming Industries
              </h2>
              <span
                className="text-700 text-2xl line-height-3 mr-0 md:mr-2"
                style={{ maxWidth: "650px" }}
              >
                SDXL 0.9 is set to revolutionize multiple industries. From
                creating stunning visual effects in film and television to
                generating dynamic album artwork for musicians.
              </span>
            </div>

            <div
              className="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0"
              style={{ borderRadius: "8px" }}
            >
              <img
                src="/demo/images/landing/mockup-desktop.svg"
                className="w-11"
                alt="mockup"
              />
            </div>
          </div>
        </div>

        <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
          <div className="grid justify-content-between">
            <div className="col-12 md:col-2" style={{ marginTop: "-1.5rem" }}>
              <Link
                href="/"
                className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer"
              >
                <img
                  src={`/layout/images/${"logo-white"}.svg`}
                  alt="footer sections"
                  width="50"
                  height="50"
                  className="mr-2"
                />
                <span className="font-medium text-3xl text-900">SDXL</span>
              </Link>
            </div>

            <div className="col-12 md:col-10 lg:col-7">
              <div className="grid text-center md:text-left">
                <div className="col-12 md:col-3">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">
                    Company
                  </h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    About Us
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    News
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Investor Relations
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Careers
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">
                    Media Kit
                  </a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">
                    Resources
                  </h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Get Started
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Learn
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">
                    Case Studies
                  </a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">
                    Community
                  </h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Discord
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Events
                    <img
                      src="/demo/images/landing/new-badge.svg"
                      className="ml-2"
                      alt="badge"
                    />
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    FAQ
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">
                    Blog
                  </a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">
                    Legal
                  </h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Brand Policy
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Privacy Policy
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LandingPage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};

export default LandingPage;
