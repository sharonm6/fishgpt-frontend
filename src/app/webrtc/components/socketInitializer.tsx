"use client";
import { useEffect, useState } from "react";
import * as socketio from "socket.io-client";
import ThoughtBubble from "@/app/thoughtbubble";

export default function SocketInitializer() {
  const [imageSrc, setImageSrc] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [leftPadding, setLeftPadding] = useState(0);
  const [topPadding, setTopPadding] = useState(0);

  const coordToPadding = (x: number, y: number, widthHeight: number[]) => {
    console.log("calc padding");
  };

  // useEffect(() => {
  //   // spawnRandomCoordinates();
  // }, []);

  function spawnRandomCoordinates(): void {
    const width: number = 640;
    const height: number = 480;

    setInterval(() => {
      const randomX: number = Math.floor(Math.random() * width);
      const randomY: number = Math.floor(Math.random() * height);

      setCoords({ x: randomX, y: randomY });
      coordToPadding(randomX, randomY, [width, height]);

      console.log(`Random coordinates: (${randomX},${randomY})`);
    }, 10000);
  }

  useEffect(() => {
    console.log("RAN USE EFFECT");
    const socket = socketio.io("https://ea1b-76-78-137-157.ngrok-free.app/", {
      extraHeaders: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    socket.on("connect", async () => {
      console.log("Successfully connected to FishGPT backend!");
      // create a webRTC offer
      // const rtcp = new RTCPeerConnection();
      // const offer = await rtcp.createOffer();
      // // send this offer to the backend to send to the python client
      // console.log(offer);
      // const offer_obj = {
      //     type: offer.type,
      //     sdp: offer.sdp
      // }
      // socket.emit('clientOffer', offer_obj);
    });
    console.log(socket);
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
    socket.on("connect_timeout", () => {
      console.error("Connection timeout");
    });
    socket.on("error", (error) => {
      console.error("Socket.io error:", error);
    });
    socket.on("coordsReceive", (data) => {
      console.log(data.data);
      setCoords(data.data);
    });
    socket.on("imageReceive", (data) => {
      const uint8Array = new Uint8Array(
        atob(data.data)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
      var img = new Image();
      img.src = imageUrl;
      img.onload = function () {
        console.log(
          coordToPadding(coords.x, coords.y, [img.width, img.height])
        );
      };
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="relative z-0 row-span-4 bg-black flex justify-center">
      {imageSrc && (
        <>
          <span
            className={`absolute z-10 ml-[${leftPadding}px] mt-[${topPadding}px]`}
          >
            {/* <ThoughtBubble text="hello, i am a thought bubble" /> */}
          </span>
          <span className="absolute z-20 ml-[150px] mt-[150px] pt-8">
            <p>Hello</p>
          </span>
          <img className="h-full" src={imageSrc} alt="Received Image" />
        </>
      )}
    </div>
  );
}
