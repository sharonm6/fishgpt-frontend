'use client'
import { useEffect, useState } from "react";
import * as socketio from "socket.io-client";
export default function SocketInitializer() {


    useEffect(() => {
        const socket = socketio.io("http://localhost:5000");

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
            console.log(data);
        })

        return () => {
            // do this to prevent 2x connections
            socket.disconnect();
        }
    }, []);

    return (
        <div>
            socket component
        </div>
    )
}