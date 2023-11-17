"use client";
import SocketInitializer from "./webrtc/components/socketInitializer";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "./navbar";
import Textbox from "./textbox";
import DisplayBox from "./displaybox";
import StreamerInfo from "./streamerinfo";

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
  const [activity, setActivity] = useState(
    `"Swimming through life's waves 🌊"`
  );

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      try {
        await fetch("/api/status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((resJson) => setActivity(resJson.data.content));
      } catch (error) {
        console.error(error);
      }
    };

    getStatus();
  }, []);

  const moveToPastTexts = () => {
    if (question != "" && answers && answers[0] != "") {
      setPastTexts((prev) => [...prev, question, answers[0]]);
    }
  };

  return (
    <main className="h-screen overflow-y-clip scrollbar-hide">
      <NavBar />
      <div className="h-[calc(100vh-48px)] grid grid-cols-12">
        <div className="col-span-7 grid grid-rows-6 bg-blue-300">
          <SocketInitializer setConnected={setConnected}/>
          <div className="row-span-2 bg-gray-800">
            <StreamerInfo
              username="FishGPT"
              status={connected? "LIVE" : "OFFLINE"}
              profilePic="/goldfish.png"
              activity={activity}
            ></StreamerInfo>
          </div>
        </div>
        <div className="col-span-5 p-4 flex items-end overflow-y-hidden bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">
          <div ref={chatContainerRef} className="w-full h-full">
            <div className="h-[88%] pb-4 scrollbar-hide overflow-y-auto">
              <div className="pl-14 pr-12 mx-auto flex flex-col gap-y-4 self-end">
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
                      <DisplayBox
                        text={answers[0]}
                        setLoading={setLoading}
                        loading={loading}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
            <div className="z-50 sticky bottom-0">
              <Textbox
                setQuestion={setQuestion}
                setAnswers={setAnswers}
                setToggle={setToggle}
                loading={loading}
                setLoading={setLoading}
                moveToPastTexts={moveToPastTexts}
                chatContainerRef={chatContainerRef}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
