import { HomeView } from "@/sections/home/view";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>YogiTech: Mentor Platform</title>
        <meta name="keywords" content="Yogitech, Yogi, Yoga" />
        <meta
          name="description"
          content="Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="YogiTech: Mentor Platform" />
        <meta
          property="og:description"
          content="Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills."
        />
        <meta property="og:url" content="https://www.yogitech.me/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.yogitech.me/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YogiTech: Mentor Platform" />
        <meta
          name="twitter:description"
          content="Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills."
        />
        <meta
          name="twitter:image"
          content="https://www.yogitech.me/twitter-image.jpg"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <HomeView />
    </>
  );
}
