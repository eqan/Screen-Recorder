/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import RecordingComponent from "../components/captureComponent";
import { Page } from "../types/layout";
import { useRouter } from "next/router";

const LandingPage: Page = (access) => {
  const router = useRouter();
  useEffect(() => {
    if (!access) {
      router.push("/auth/login");
    }
  }, []);
  return (
    <div>
      <RecordingComponent />
    </div>
  );
};

export default LandingPage;
