import { useState, useEffect } from "react";
import Image from "next/image";

export default function ThoughtBubble({ text }: { text: string }) {
  return (
    <div className="relative">
      <Image
        src="/thoughtbubble.png"
        height={100}
        width={100}
        alt="thought bubble"
      />
      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black">
        {text}
      </p>
    </div>
  );
}
