// components/ChatBot/StaticMessage.jsx
"use client";

import React from "react";

function StaticMessage({ content }) {
  // Check if content is an array
  if (Array.isArray(content)) {
    return (
      <div>
        {content.map((part, index) => {
          // If the part is a string, return it directly
          if (typeof part === "string") {
            return <span key={index}>{part}</span>;
          }

          // If the part is a React element, return it directly
          return React.cloneElement(part, { key: index });
        })}
      </div>
    );
  }

  // If content is not an array, render it as a string
  return <div>{content}</div>;
}

export default StaticMessage;
