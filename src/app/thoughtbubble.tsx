import Image from "next/image";

export default function ThoughtBubble({
    text,
  }: {
    text: String;
  }){
  return (
    <div className="relative">
        <Image
          src="/thoughtbubble.png"
          height={100}
          width={100}
          alt="thought bubble"
        />
    </div>
  );
};

