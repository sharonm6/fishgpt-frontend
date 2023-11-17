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
  setIsErr,
}: {
  setQuestion: Dispatch<SetStateAction<string>>;
  setAnswers: Dispatch<SetStateAction<string[]>>;
  setToggle: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  moveToPastTexts: Function;
  chatContainerRef: RefObject<HTMLDivElement>;
  setIsErr: Dispatch<SetStateAction<boolean>>;
}) {
  const [inputText, setInputText] = useState("");

  const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!loading && event.key === "Enter") {
      moveToPastTexts();
      setAnswers([""]);
      setLoading(true);
      setToggle((prev) => !prev);
      setIsErr(false);
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
          .then((res) => {
            if (!res.ok) {
              console.log("error", res);
            }
            return res.json();
          })
          .then((resJson) => {
            var parsedAnswers: string[] = resJson.data.content.split("*").filter((elem: string)=>{return elem.length > 0});
            parsedAnswers = parsedAnswers.map((elem) => {
              return elem.replaceAll("* ", "").trim();
            })
            setAnswers(parsedAnswers);
          });
      } catch (error) {
        setIsErr(true);
        setAnswers([
          "Uh-oh! Our fish swam away from the keyboard. Please reel them back in and try again later!",
        ]);
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
