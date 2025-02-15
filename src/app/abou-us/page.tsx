import { HomeView } from "@/sections/home/view";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>About us - YogiTech</title>
        <meta
          name="keywords"
          content="Yogitech, Yogi, Yoga, about us, mentor, ai, yoga ai"
        />
        <meta
          name="description"
          content="We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="YogiTech: Mentor Platform" />
        <meta
          property="og:description"
          content="We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries."
        />
        <meta property="og:url" content="https://www.yogitech.me/about-us" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.yogitech.me/banner.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YogiTech: Mentor Platform" />
        <meta
          name="twitter:description"
          content="We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries."
        />
        <meta
          name="twitter:image"
          content="https://www.yogitech.me/banner.png"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <HomeView />
    </>
  );
}
