"use client";

import React from "react";
import { WindupChildren } from "windups";

function TypedMessage({ content, onTypeDone, onTypeProgress }) {
  const safeContent = Array.isArray(content) ? content : [content];

  return (
    <WindupChildren onFinished={onTypeDone} onCharTyped={onTypeProgress}>
      {safeContent.map((part, index) => (
        <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
      ))}
    </WindupChildren>
  );
}

export default TypedMessage;
