/* eslint-disable @next/next/no-img-element */
import React from "react";
import RecordingComponent from "../components/captureComponent";
import { Page } from "../types/layout";

const LandingPage: Page = () => {
  return (
    <div>
      <h1>Screen Recording</h1>
      <RecordingComponent />
    </div>
  );
};

export default LandingPage;
