"use client";
import SocketInitializer from "./webrtc/components/socketInitializer";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "./navbar";
import Textbox from "./textbox";
import DisplayBox from "./displaybox";

export default function Home() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [pastTexts, setPastTexts] = useState<string[]>([
    "Example Question",
    "Example Answer",
    "Second Question",
    "Second Answer",
  ]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const moveToPastTexts = () => {
    if (question != "" && answers && answers[0] != "") {
      setPastTexts((prev) => [...prev, question, answers[0]]);
    }
  };

  useEffect(() => {
    // Function to scroll chat container to the bottom
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [pastTexts]);

  return (
    <main className="h-screen">
      <NavBar />
      <div className="h-[calc(100vh-48px)] grid grid-cols-12">
        <div className="col-span-8 grid grid-rows-6 bg-blue-300">
          <SocketInitializer />
          <div className="row-span-2">FishGPT</div>
        </div>
        <div className="col-span-4 p-4 bg-pink-300 flex items-end overflow-y-hidden">
          <div
            ref={chatContainerRef}
            className="w-full h-full scrollbar-hide overflow-y-auto"
          >
            <div className="px-12 mx-auto -p-8 flex flex-col gap-y-4 self-end">
              {pastTexts.map((text, index) => (
                <DisplayBox
                  key={index}
                  text={text}
                  isQuestion={index % 2 === 0}
                  isPast={true}
                />
              ))}
              {question && (
                <AnimatePresence>
                  <motion.div
                    key={`question-${toggle}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
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
                    transition={{ type: "spring" }}
                  >
                    <DisplayBox text={answers[0]} setLoading={setLoading} />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
            <div className="z-50 sticky bottom-0">
              <Textbox
                setQuestion={setQuestion}
                setAnswers={setAnswers}
                setToggle={setToggle}
                loading={loading}
                setLoading={setLoading}
                moveToPastTexts={moveToPastTexts}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
