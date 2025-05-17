"use client";

import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { memo } from "react";

const GoogleThirdParties = () => {
  return (
    <>
      <GoogleAnalytics gaId="G-686MPCS14D" />
      <GoogleTagManager gtmId="GTM-P43FRWB7" />
    </>
  );
};

export default memo(GoogleThirdParties);
