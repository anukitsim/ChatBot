// components/chatbot/ChatBubbleContent.jsx
"use client";

import React from "react";
import TypedMessage from "./TypedMessage";
import StaticMessage from "./StaticMessage";

function ChatBubbleContent({ content, type, onTypeDone, onTypeProgress, typed, source }) {
  if (type === "bot") {
    return typed ? (
      <StaticMessage content={content} source={source} />
    ) : (
      <TypedMessage
        content={content}
        onTypeDone={onTypeDone}
        onTypeProgress={onTypeProgress}
        source={source}
      />
    );
  }

  return <StaticMessage content={content} source={source} />;
}

export default ChatBubbleContent;
