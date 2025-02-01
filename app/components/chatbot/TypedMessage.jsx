"use client";

import React from "react";
import { WindupChildren } from "windups";

function TypedMessage({ content, onTypeDone, onTypeProgress, source }) {
  const safeContent = Array.isArray(content) ? content : [content];

  return (
    <WindupChildren onFinished={onTypeDone} onCharTyped={onTypeProgress}>
      {safeContent.map((part, index) => {
        if (typeof part === "string") {
          return <span key={index}>{part}</span>;
        }
        return React.cloneElement(part, { key: index });
      })}
    </WindupChildren>
  );
}

export default TypedMessage;