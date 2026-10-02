import React, { useState, useEffect } from 'react'

const sentences = [
 
  'I build modern web applications',
  'Full-stack developer, MERN specialist',
  'MongoDB · Express · React · Node',
  'Turning ideas into working products',
];

const TYPE_SPEED = 40;      // ms per character while typing
const DELETE_SPEED = 25;    // ms per character while deleting (a bit faster feels natural)
const HOLD_TIME = 1600;     // pause once a sentence is fully typed, before deleting
const NEXT_PAUSE = 300;     // pause after deleting, before typing the next sentence

const TypingHeading = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = sentences[sentenceIndex];

    // Finished typing this sentence — hold, then start deleting
    if (!isDeleting && charCount === current.length) {
      const t = setTimeout(() => setIsDeleting(true), HOLD_TIME);
      return () => clearTimeout(t);
    }

    // Finished deleting — move to the next sentence
    if (isDeleting && charCount === 0) {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setSentenceIndex((i) => (i + 1) % sentences.length);
      }, NEXT_PAUSE);
      return () => clearTimeout(t);
    }

    // Otherwise, keep typing or deleting one character at a time
    const t = setTimeout(
      () => setCharCount((c) => c + (isDeleting ? -1 : 1)),
      isDeleting ? DELETE_SPEED : TYPE_SPEED
    );
    return () => clearTimeout(t);
  }, [charCount, isDeleting, sentenceIndex]);

  return (
    <h1 className="text-4xl md:text-[56px]/[68px] max-w-2xl leading-tight text-center md:text-left min-h-[2.4em]">
      {sentences[sentenceIndex].slice(0, charCount)}
      <span className="inline-block w-[3px] h-[0.9em] bg-[#A6FF5D] ml-1 align-middle animate-pulse" />
    </h1>
  )
}

export default TypingHeading