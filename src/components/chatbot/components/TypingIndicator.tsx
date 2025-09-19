// components/TypingIndicator.tsx
import React from "react";

const TypingIndicator = () => (
  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-xl max-w-xs">
    <svg
      className="w-5 h-5 text-blue-600 animate-pulse"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h8m-8 4h6"
      />
    </svg>
    <span className="text-sm font-semibold text-blue-700 select-none">Tono is typing</span>
    <div className="flex space-x-1">
      <span
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "-0.3s" }}
      ></span>
      <span
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "-0.15s" }}
      ></span>
      <span
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
      ></span>
    </div>
  </div>
);

export default TypingIndicator;
