import type { AppProps } from "next/app";
import type { Page } from "../types/types";
import React, { useEffect, useState } from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import { useRouter } from "next/router";
import { auth } from "../firebase";

type Props = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
  const [access, setAccess] = useState(false);
  const route = useRouter();
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      user
        .getIdToken(true)
        .then(function (idToken) {
          setAccess(true);
          console.log(idToken);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);
  if (Component.getLayout) {
    return (
      <LayoutProvider>
        {Component.getLayout(<Component {...pageProps} />)}
      </LayoutProvider>
    );
  } else {
    return (
      <LayoutProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutProvider>
    );
  }
}
