"use client";
import SocketInitializer from "./webrtc/components/socketInitializer";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Textbox from "./textbox";
import DisplayBox from "./displaybox";
import ThoughtBubble from "./thoughtbubble";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <main className="grid grid-cols-12 h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="col-span-8 grid grid-rows-6 bg-green-300">
        <SocketInitializer />
        <div className="row-span-2">FishGPT</div>
      </div>
      <div className="col-span-4 h-full p-8 bg-red-300 flex items-end">
        <div className="w-[85%] mx-auto flex flex-col gap-y-4">
          {question && (
            <AnimatePresence>
              <motion.div
                key={`question-${toggle}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <DisplayBox text={question} isQuestion={true} />
              </motion.div>
            </AnimatePresence>
          )}
          {answers && answers[0] && (
            <AnimatePresence>
              <motion.div
                key={`answer-${toggle}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <DisplayBox text={answers[0]} setLoading={setLoading} />
              </motion.div>
            </AnimatePresence>
          )}
          <Textbox
            setQuestion={setQuestion}
            setAnswers={setAnswers}
            setToggle={setToggle}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
      {/* <div>
        <ThoughtBubble text="hello, i am a thought bubble"></ThoughtBubble>
      </div> */}
    </main>
  );
}
