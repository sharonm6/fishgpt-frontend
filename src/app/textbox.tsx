import { Dispatch, SetStateAction, useState, KeyboardEvent } from "react";


export default function Textbox({setQuestion, setAnswers} : {setQuestion: Dispatch<SetStateAction<string>>, setAnswers: Dispatch<SetStateAction<string[]>>}) {
    const [inputText, setInputText] = useState('');
    
    const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          try {
            setQuestion(inputText);
            await fetch("/api/answer", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: inputText})
              }).then(res => res.json())
              .then(resJson => setAnswers(resJson.data.content.split('\n')));
            setInputText('');
          } catch (error) {
            console.error(error);
          }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question and press Enter..."
            />
        </div>
    );
}