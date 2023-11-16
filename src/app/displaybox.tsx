import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function DisplayBox({
  text,
  isQuestion = false,
  setLoading = () => {},
  isPast = false,
}: {
  text: String;
  isQuestion?: boolean;
  setLoading?: Function;
  isPast?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <div className="flex items-center">
      {isQuestion ? (
        <img
          src="/humanicon.png"
          alt="Fish Icon"
          className="w-10 h-10 -ml-12 mr-2 rounded-full"
        />
      ) : (
        <img
          src="/goldfish.png"
          alt="Fish Icon"
          className="w-10 h-10 -ml-12 mr-2 rounded-full"
        />
      )}
      <div className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
        {isQuestion || isPast ? (
          <>{text}</>
        ) : (
          <TypeAnimation
            ref={ref}
            sequence={[`${text}`, () => setLoading(false)]}
            speed={80}
            style={{ whiteSpace: "pre-line" }}
            cursor={false}
          />
        )}
      </div>
    </div>
  );
}
