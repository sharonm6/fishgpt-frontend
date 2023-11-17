"use client";
import { useEffect, useState } from "react";
import * as socketio from "socket.io-client";
import ThoughtBubble from "@/app/thoughtbubble";

export default function SocketInitializer() {
  const [imageSrc, setImageSrc] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const coordToPadding = (x: number, y: number, widthHeight: number[]) => {
    console.log("=> coordToPadding", x, y, widthHeight);
    return [widthHeight[0] * (x / 640), widthHeight[1] * (y / 480)];
  };

  useEffect(() => {
    const socket = socketio.io("https://marshy-glaze-brazil.glitch.me/");

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
  }, [coords]);

  return (
    <div className="relative z-0 row-span-4 bg-black flex justify-center">
      {imageSrc && (
        <>
          <span className="absolute z-10 ml-[150px] mt-[150px]">
            <ThoughtBubble text="hello, i am a thought bubble" />
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
