import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function DisplayBox({text, isQuestion = false} : {text: String, isQuestion?: boolean}) {
    const ref = useRef<HTMLSpanElement>(null);

    return (
        <div className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
            {isQuestion ? 
              <>{text}</> :
              <TypeAnimation
                  ref={ref}
                  sequence={[
                    `${text}`,
                  ]}
                  speed={80}
                  style={{ whiteSpace: "pre-line" }}
                  cursor={false}
              />
            }
        </div>
    );
}