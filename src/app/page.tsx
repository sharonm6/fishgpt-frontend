'use client';
import {useState} from 'react';
import answerJson from '../lib/answer.json';
import Textbox from './textbox';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(answerJson);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hi</p>
      <p>Question: {question}</p>
      <p>Possible Answers are: {answers}</p>
      <Textbox setQuestion={setQuestion} setAnswers={setAnswers} />
    </main>
  )
}
