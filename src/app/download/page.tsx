import { DownloadView } from "@/sections/download/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download the YogiTech app to connect with experts and enhance your skills.",
};
export default function Download() {
  return <DownloadView />;
}
