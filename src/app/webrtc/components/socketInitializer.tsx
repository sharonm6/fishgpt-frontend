"use client";
import { useEffect, useState } from "react";
import * as socketio from "socket.io-client";
export default function SocketInitializer() {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const socket = socketio.io("https://fishgpt-backend.dylanvu9.repl.co/");

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

    socket.on("imageReceive", (data) => {
      const uint8Array = new Uint8Array(
        atob(data.data)
          .split("")
          .map((char) => char.charCodeAt(0))
      );

      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      setImageSrc(URL.createObjectURL(blob));
    });

    socket.on("coordsReceive", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {imageSrc && (
        <img src={imageSrc} alt="Received Image" className="w-fit" />
      )}
    </>
  );
}
