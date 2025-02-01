"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Custom components for structured rendering
const MarkdownComponents = {
  a: ({ node, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#e5703a", textDecoration: "underline" }}
    >
      {props.children}
    </a>
  ),
  p: ({ node, ...props }) => <p style={{ marginBottom: "10px" }} {...props} />,
  ul: ({ node, ...props }) => (
    <ul style={{ paddingLeft: "20px", marginBottom: "10px", listStyleType: "disc" }} {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol style={{ paddingLeft: "20px", marginBottom: "10px", listStyleType: "decimal" }} {...props} />
  ),
  li: ({ node, ...props }) => <li style={{ marginBottom: "5px" }} {...props} />,
  strong: ({ node, ...props }) => <strong style={{ fontWeight: "bold" }} {...props} />,
  em: ({ node, ...props }) => <em style={{ fontStyle: "italic" }} {...props} />,
};

export default function PineconeMessage({ content }) {
  if (!content) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={MarkdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
