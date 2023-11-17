"use client";
import SocketInitializer from "./webrtc/components/socketInitializer";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "./navbar";
import Textbox from "./textbox";
import DisplayBox from "./displaybox";
import LoadingBox from "./loadingbox";
import StreamerInfo from "./streamerinfo";

export default function Home() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [choice, setChoice] = useState(0);
  const [pastTexts, setPastTexts] = useState<string[]>([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState(
    `"Swimming through life's waves 🌊"`
  );
  const [isErr, setIsErr] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      try {
        await fetch("/api/status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "Generate a fun status blurb that is less than 5 words.",
          }),
        })
          .then((res) => res.json())
          .then((resJson) => setActivity(resJson.data.content));
      } catch (error) {
        console.error(
          "Uh-oh! Our fish swam away from the keyboard. Please reel them back in and try again later!"
        );
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
          <SocketInitializer
            connected={connected}
            setConnected={setConnected}
            setChoice={setChoice}
          />
          <div className="row-span-2 bg-gray-800">
            <StreamerInfo
              username="FishGPT"
              status={connected ? "LIVE" : "OFFLINE"}
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
                        text={isErr ? answers[0] : answers[choice]}
                        setLoading={setLoading}
                        loading={loading}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
                {loading && <LoadingBox />}
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
                setIsErr={setIsErr}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
