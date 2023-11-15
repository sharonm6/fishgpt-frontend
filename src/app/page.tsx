'use client';
import {useState} from 'react';
import Textbox from './textbox';
import DisplayBox from './displaybox';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['']);

  return (
    <main className="flex min-h-screen p-20">
      <div className="w-full self-end flex flex-col gap-y-4">
        {question && <DisplayBox text={question} isQuestion={true} />}
        {answers && answers[0] && <DisplayBox text={answers[0]}/>}
        <Textbox setQuestion={setQuestion} setAnswers={setAnswers} />
      </div>
    </main>
  )
}
