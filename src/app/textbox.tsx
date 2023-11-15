import { Dispatch, SetStateAction, useState, KeyboardEvent } from "react";
import answerJson from '../lib/answer.json';

export default function Textbox({setQuestion, setAnswers} : {setQuestion: Dispatch<SetStateAction<string>>, setAnswers: Dispatch<SetStateAction<string[]>>}) {
    const [inputText, setInputText] = useState('');
    
    const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          setQuestion('');
          setAnswers(['']);
          try {
            setQuestion(inputText);
            setInputText('');
            // await fetch("/api/answer", {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ prompt: inputText})
            //   }).then(res => res.json())
            //   .then(resJson => setAnswers(resJson.data.content.split('\n')));
            setTimeout(function() {
              setAnswers(answerJson);
            }, 1000);
          } catch (error) {
            console.error(error);
          }
        }
    };

    return (
        <div className="w-full">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question and press Enter..."
                className="block w-full rounded-md border-0 px-3.5 py-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none focus:ring-0 focus:shadow-md sm:text-sm sm:leading-6"
            />
        </div>
    );
}