"use client";

import { m, domMax, LazyMotion } from "motion/react";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function MotionLazy({ children }: Props) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: "100%" }}> {children} </m.div>
    </LazyMotion>
  );
}
