"use client";
import { useEffect, useState } from "react";
import * as socketio from "socket.io-client";
import ThoughtBubble from "@/app/thoughtbubble";
import { Dispatch, SetStateAction } from "react";

export default function SocketInitializer({
  connected,
  setConnected,
}: {
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
}) {
  const [imageSrc, setImageSrc] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // const coordToPadding = (x: number, y: number, widthHeight: number[]) => {
  //   console.log("calc padding", 'x', x, 'y', y);
  //   let left = x - 270;
  //   let right = 0;
  //   if (left < 0){
  //     right = -left;
  //     left = 0;
  //   }
  //   let top = y - 380;
  //   console.log('left', left, 'right', right, 'top', top);

  // };

  // useEffect(() => {
  //   console.log('leftpadding', leftPadding, 'rightPadding', rightPadding, 'topPadding', topPadding);
  // }, [leftPadding, rightPadding, topPadding]);

  useEffect(() => {
    const socket = socketio.io("https://ea1b-76-78-137-157.ngrok-free.app/", {
      extraHeaders: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    socket.on("connect", async () => {
      console.log("Successfully connected to FishGPT backend!");
      setConnected(true);
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
      // var img = new Image();
      // img.src = imageUrl;
      // img.onload = function () {
      //   console.log('coords pre to padding', coords);
      //   // coordToPadding(coords.x, coords.y, [img.width, img.height]);
      // };
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
            <>
              <div
                className={`absolute z-10`}
                style={{
                  marginRight: coords.x + 400,
                  marginTop: coords.y + 10,
                }}
              >
                {/* <ThoughtBubble text="..." /> */}
                asdf
              </div>
              <img className="h-full" src={imageSrc} alt="Received Image" />
            </>
          )}
        </>
      ) : (
        <img className="h-full" src="/fishswim.gif" alt="Received Image" />
      )}
    </div>
  );
}
