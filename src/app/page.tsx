import Image from 'next/image'
'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hi
      <button onClick={
        async () => {const res = await fetch("/api/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "Hello"})
        })}}>
        TEST GPT API
      </button>
    </main>
  )
}
