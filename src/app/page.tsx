"use client";
import SocketInitializer from "./webrtc/components/socketInitializer";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Textbox from "./textbox";
import DisplayBox from "./displaybox";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex flex-row justify-between h-screen p-20 gap-12 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-[80%] mx-auto self-end flex flex-col gap-y-4">
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
      <div className="flex self-center h-96 bg-blue-500">
        <SocketInitializer />
      </div>
    </main>
  );
}
