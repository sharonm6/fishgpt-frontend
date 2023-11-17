import {
  Dispatch,
  SetStateAction,
  useState,
  KeyboardEvent,
  RefObject,
} from "react";

export default function Textbox({
  setQuestion,
    setAnswers,
  setToggle,
  loading,
  setLoading,
  moveToPastTexts,
  chatContainerRef,
}: {
  setQuestion: Dispatch<SetStateAction<string>>;
  setAnswers: Dispatch<SetStateAction<string[]>>;
  setToggle: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  moveToPastTexts: Function;
  chatContainerRef: RefObject<HTMLDivElement>;
}) {
  const [inputText, setInputText] = useState("");

  const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!loading && event.key === "Enter") {
      moveToPastTexts();
      setAnswers([""]);
      setLoading(true);
      setToggle((prev) => !prev);
      setQuestion(inputText);
      setInputText("");
      () =>
        chatContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      try {
        await fetch("/api/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputText }),
        })
          .then((res) => res.json())
          .then((resJson) => setAnswers(resJson.data.content.split("\n")));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <textarea
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onKeyDown={(e) => handleKeyPress(e)}
      placeholder="Type your question and press Enter..."
      className="block w-full resize-none rounded-lg border border-gray-300 px-3.5 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:shadow-md sm:text-sm sm:leading-6"
    />
  );
}
