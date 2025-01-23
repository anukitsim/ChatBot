"use client";

import React from "react";
import { WindupChildren } from "windups";

function TypedMessage({ content, onTypeDone, onTypeProgress }) {
  // Ensure content is an array or fallback to an empty string
  const safeContent = Array.isArray(content)
    ? content
    : typeof content === "string"
    ? [content]
    : [""];

  return (
    <WindupChildren
      onFinished={onTypeDone} // Trigger when typing is complete
      onCharTyped={onTypeProgress} // Trigger on every character typed
    >
      {safeContent.map((part, index) => (
        <span key={index}>{part}</span>
      ))}
    </WindupChildren>
  );
}

export default TypedMessage;
