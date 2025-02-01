"use client";

import React from "react";
import parseHtmlToJSXArray from "@/utils/parseHtmlToJSXArray";
import PineconeMessage from "./PineconeMessage";

function StaticMessage({ content, source }) {
  if (Array.isArray(content)) {
    return (
      <div>
        {content.map((part, index) => {
          if (typeof part === "string") {
            return <React.Fragment key={index}>{part}</React.Fragment>;
          }
          return React.cloneElement(part, { key: index });
        })}
      </div>
    );
  }

  if (typeof content === "string") {
    if (source === "wp") {
      return <div>{parseHtmlToJSXArray(content)}</div>;
    } else if (source === "pinecone") {
      return <PineconeMessage content={content} />;
    }
  }

  return <div>{content}</div>;
}

export default StaticMessage;
