import Head from "next/head";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React, { useContext, useState, useRef, useEffect } from "react";
import { LayoutContext } from "../../../layout/context/layoutcontext";
import { classNames } from "primereact/utils";
import Cookies from "js-cookie";
import { Button } from "primereact/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { addUser } from "../../../queries/User/createUser";

const LoginPage = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const router = useRouter();
  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );
  const [isMessageShown, setIsMessageShown] = useState(false);
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    const user = result.user;
    createUser(user.email, user.displayName);
  };
  const [user, setUsers] = useAuthState(auth);
  const db = getFirestore();

  async function createUser(email: string | null, displayName: string | null) {
    try {
      addUser(email, displayName);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (user != null) {
      Cookies.set("accessToken", user["accessToken"], { expires: 1 });
      router.push("/");
    }
  }, [user]);

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        {/* <img
          src={`${contextPath}/layout/images/logo.png`}
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        /> */}
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 146, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                Welcome to Microslush Screen Recorder
              </div>
              <span className="text-600 font-medium">Login to continue</span>
              <div style={{ marginTop: "20px" }}>
                <Button
                  label="Sign in with Google"
                  icon="pi pi-google"
                  onClick={login}
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page) {
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  return (
    <React.Fragment>
      <Head>
        <title>Microslush Screen Recorder</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Microslush Screen Recorder"></meta>
        <meta property="og:description" content="" />
        <meta
          property="og:image"
          content="https://live.staticflickr.com/65535/52701824785_51bdbe03fd_h.jpg"
        ></meta>
        <meta property="og:ttl" content="604800"></meta>
        {/* <link
          rel="icon"
          href={`${contextPath}/logo.png`}
          type="image/x-icon"
        ></link> */}
      </Head>
      {page}
    </React.Fragment>
  );
};
export default LoginPage;
