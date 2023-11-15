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
        {question && <DisplayBox texts={[question]} />}
        {answers && answers[0] && <DisplayBox texts={answers} />}
        <Textbox setQuestion={setQuestion} setAnswers={setAnswers} />
      </div>
    </main>
  )
}
