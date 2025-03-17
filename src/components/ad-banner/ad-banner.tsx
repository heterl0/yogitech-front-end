/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useEffect } from "react";

const AdBanner = (props: any) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: "block",
        overflow: "hidden",
      }}
      data-ad-client="ca-pub-3767915082225357"
      {...props}
    />
  );
};
export default memo(AdBanner);
