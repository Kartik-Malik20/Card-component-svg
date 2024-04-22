import { RefObject, useEffect, useState } from "react";

interface Props {
  cursor: { x: number; y: number };
  cardRef: RefObject<HTMLElement>;
  mouseOnCard: boolean
}

const Computer = ({ cursor, cardRef, mouseOnCard }: Props) => {
  const [gradientCenter, setGradientCenter] = useState({
    cx: "50%",
    cy: "50%",
  });
  useEffect(() => {
    if (cardRef.current && cursor.x != null && cursor.y != null) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const cxPercentage = (cursor.x / cardRect.width) * 100 -24;
      const cyPercentage = (cursor.y / cardRect.height) * 100;
      setGradientCenter({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor, cardRef]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-96 h-96 duration-200 transition-all"
    >
      <defs>
        <radialGradient
          id="emeraldGradient"
          gradientUnits="userSpaceOnUse"
          cx={gradientCenter.cx}
          cy={gradientCenter.cy}
          r={"35%"}
        >
          {mouseOnCard && <stop stopColor="#10b981" />}
          <stop offset={1} stopColor="#404040" />
        </radialGradient>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        className="fill-neutral-950/50"
        stroke="url(#emeraldGradient)"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-neutral-200/50"
        stroke="url(#emeraldGradient)"
        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
      />
    </svg>
  );
};

export default Computer;
