"use client";

import { cn } from "@/utils/cn";
import React, { memo, ReactNode } from "react";

type Props = {
  className?: string; // Tailwindcss class
  children?: ReactNode;
};
/**
 * A functional component that serves as a content wrapper with
 * flexible styling and layout options. It applies custom classes passed via
 * the `className` prop and arranges its children vertically in a flex column.
 *
 * @param {string} className - Optional Tailwind CSS classes for additional styling.
 * @param {ReactNode} children - Elements or components to be wrapped inside the box.
 *
 * @returns {JSX.Element} A div container with flexible layout, spacing, and border styling.
 *
 * @usage
 * This component can be used to wrap content with custom styling.
 * For example:
 *
 * ```
 * <BoxContentWrapper className="custom-class">
 *   <p>Content goes here</p>
 * </BoxContentWrapper>
 * ```
 *
 * The wrapper will apply the provided class and default styling to the content inside.
 */
const LayoutWrapper = ({ className, children }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className={cn("flex flex-col gap-6 px-5 pb-6 md:px-10", className)}>
        {children}
      </div>
    </div>
  );
};

export default memo(LayoutWrapper);
