"use client";

import React from "react";
import parseHtmlToJSXArray from "@/utils/parseHtmlToJSXArray";
import PineconeMessage from "./PineconeMessage";

/**
 * Recursively traverse a React element (or array of elements) and ensure that all anchor tags
 * have target="_blank" and rel="noopener noreferrer".
 */
function fixLinksInJSX(element) {
  if (React.isValidElement(element)) {
    // If the element is an <a> tag, clone it with the extra attributes.
    if (element.type === "a") {
      return React.cloneElement(
        element,
        {
          target: "_blank",
          rel: "noopener noreferrer",
          // Preserve any other props.
          ...element.props,
        },
        element.props.children &&
          React.Children.map(element.props.children, fixLinksInJSX)
      );
    }
    // If the element has children, process them recursively.
    if (element.props && element.props.children) {
      return React.cloneElement(element, {
        children: React.Children.map(element.props.children, fixLinksInJSX),
      });
    }
  }
  return element;
}

function StaticMessage({ content, source }) {
  // If content is an array…
  if (Array.isArray(content)) {
    if (source === "pinecone") {
      // Process each element recursively to fix <a> tags.
      const fixedContent = content.map((part) => fixLinksInJSX(part));
      return <div>{fixedContent}</div>;
    }
    // For non-pinecone arrays, just render as before.
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

  // If content is a string, choose the proper conversion.
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
