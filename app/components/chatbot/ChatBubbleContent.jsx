"use client";

import React from "react";
import TypedMessage from "./TypedMessage";
import StaticMessage from "./StaticMessage";

function ChatBubbleContent({ content, type, onTypeDone, onTypeProgress, typed }) {
  if (type === "bot") {
    return typed ? (
      <StaticMessage content={content} />
    ) : (
      <TypedMessage
        content={content}
        onTypeDone={onTypeDone}
        onTypeProgress={onTypeProgress} 
      />
    );
  }

  return <StaticMessage content={content} />;
}

export default ChatBubbleContent;
