"use client";
import { useEffect, useState } from "react";
import * as socketio from "socket.io-client";
import { Dispatch, SetStateAction } from "react";

export default function SocketInitializer({
  connected,
  setConnected,
  setChoice,
  setViewers
}: {
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
  setChoice: Dispatch<SetStateAction<number>>;
  setViewers: Dispatch<SetStateAction<number>>;
}) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // TODO: change the url to be the right one
    const socket = socketio.io("http://localhost:5000", {
      extraHeaders: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    socket.on("connect", async () => {
      console.log("Successfully connected to FishGPT backend!");
    });

    socket.on("coordsReceive", (data) => {
      setChoice(data.data.quadrant);
    });

    socket.on("imageReceive", (data) => {
      setConnected(true);
      const uint8Array = new Uint8Array(
        atob(data.data)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    });

    socket.on("sendViewCount", (data) => {
      console.log(`The new view count is: ${data.data}`);
      setViewers(data.data);
    });

    return () => {
      socket.disconnect();
      setConnected(false);
    };
  }, []);

  return (
    <div className="relative z-0 row-span-4 bg-black flex justify-center">
      {connected ? (
        <>
          {imageSrc && (
            <img className="h-full" src={imageSrc} alt="Received Image" />
          )}
        </>
      ) : (
        <img className="h-full" src="/fishswim.gif" alt="Received Image" />
      )}
    </div>
  );
}
