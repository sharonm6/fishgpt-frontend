import { useRef, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

export default function LoadingBox({
  loading = false,
}: {
  loading?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let intervalId: any;

    const scrollIntoViewInterval = () => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    // Start the interval when loading is true
    if (loading === true) {
      intervalId = setInterval(scrollIntoViewInterval, 1000);
    } else if (loading === false) {
      scrollIntoViewInterval();
    }

    // Clear the interval when loading is false
    return () => clearInterval(intervalId);
  }, [loading]);

  return (
    <div className="flex items-start">
        <img
          src="/goldfish.png"
          alt="Fish Icon"
          className="w-10 h-10 -ml-12 mr-2 rounded-full"
        />
      <div className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
          <TypeAnimation
            ref={ref}
            sequence={["..."]}
            speed={80}
            deletionSpeed={80}
            style={{ whiteSpace: "pre-line" }}
            cursor={false}
            repeat={Infinity}
          />
      </div>
    </div>
  );
}
