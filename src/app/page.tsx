'use client';
import {useState} from 'react';
import answerJson from '../lib/answer.json';

export default function Home() {
  const [answers, setAnswers] = useState(answerJson);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hi
      Possible Answers are:
      {answers}
      {/* <button onClick={
        async () => {await fetch("/api/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "What color is the sky?"})
        }).then(res => res.json())
        .then(resJson => setAnswers(resJson.data.content.split('\n')))
        }}>
        TEST GPT API
      </button> */}
    </main>
  )
}
