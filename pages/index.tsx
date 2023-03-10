import Head from "next/head";
import Image from "next/image";
import Map from "../components/Map/";
import Button from "../components/Button/Button";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useProfile } from "../hooks/useProfile";

import React, { useState } from "react";
import { useEffect, useContext } from "react";
import DemoModeContext from "../contexts/demoMode";
import Carousel from "../components/Carousel/Carousel";

/**
 * The landing page for new, not logged in users, and the home page for the consumer account.
 */
export default function Home() {
  const user = useUser();
  const { profile } = useProfile();
  const router = useRouter();
  const { demoModeActive, setDemoModeActive } = useContext(DemoModeContext);
  const [demoButtonText, setDemoButtonText] = useState("");

  useEffect(() => {
    if (profile?.user_type === "business") {
      router.push("/businesshome");
    } else if (profile?.user_type === "") {
      router.push("/usertype");
    }
  }, [profile]);

  useEffect(() => {
    if (demoModeActive) {
      setDemoButtonText("DEMO MODE ON");
    } else {
      setDemoButtonText("DEMO MODE OFF");
    }
  }, [demoModeActive]);

  /**
   * Function that redirects the user to the user settings page
   */
  function redirectToSettings() {
    router.push("/usersettings");
  }

  /**
   * Function that redirects the user to the login page
   */
  function redirectToLogIn() {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>IndyGo</title>
        <meta name="description" content="Support local businesses!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
      </Head>
      <Image
        src="/logo.svg"
        alt="logo"
        width="100"
        height="100"
        className="rounded-lg absolute top-2 left-2 z-10"
      />
      {user ? (
        <>
          <Button
            className="absolute top-20 right-2 z-10"
            buttonText="SETTINGS"
            onClick={redirectToSettings}
          />
        </>
      ) : (
        <Button
          className="absolute top-20 right-2 z-10"
          buttonText="LOG IN"
          onClick={redirectToLogIn}
        />
      )}
      <Button
        className="absolute top-2 right-2 z-10 h-18"
        buttonText={demoButtonText}
        onClick={() => setDemoModeActive(!demoModeActive)}
      />
      <main className="w-screen">
        <div className="z-0">
          <Map />
        </div>
        <div
          id="carousel-container"
          className="z-50 absolute bottom-0 w-screen h-60 md:h-80"
        >
          <Carousel />
        </div>
      </main>
    </>
  );
}
