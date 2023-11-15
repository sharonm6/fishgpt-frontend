
export default function ThoughtBubble({
    text,
  }: {
    text: String;
  }){
  return (
    <div className="relative">
        <svg
        className="w-20 h-auto"
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            fill="#FFF"
            d="M21 2.41c0-.45-.42-.82-.93-.82-1.33 0-2.4 1.17-2.4 2.6 0 .32.06.63.17.92-.7.25-1.2.94-1.2 1.77 0 1.02.82 1.86 1.82 1.86h.46c.55 0 1.04.43 1.04.98 0 .54-.49.98-1.04.98H8.06c-1.76 0-3.2-1.5-3.2-3.33 0-1.8 1.43-3.26 3.2-3.26.31 0 .6.05.88.14.15-.53.55-.97 1.07-1.19a2.42 2.42 0 0 0-1.08-.25C2.48 4.02 0 6.1 0 8.53 0 10.97 2.48 13 5.52 13H22c3.25 0 5.88-2.7 5.88-6.04 0-3.34-2.63-6.05-5.88-6.05z"
        />

        <text x="50%" y="50%" textAnchor="middle" fill="#000" fontSize="4">
            {text}
        </text>
        </svg>
    </div>
  );
};

