"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * Pre-process the Markdown string by replacing phone numbers with clickable links.
 */
function linkifyPhoneNumbersInMarkdown(markdown) {
  const phoneRegex = /(\+?\s*\(?\d{1,4}\)?[\d\-\s\(\)]{7,}\d)/g;
  return markdown.replace(phoneRegex, (match) => {
    const telNumber = match.replace(/\s+/g, "");
    return `<a href="tel:${telNumber}" style="color: #e5703a; text-decoration: underline;">${match}</a>`;
  });
}

// Custom components for Markdown rendering.
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

  // Pre-process the Markdown content to inject clickable phone links.
  const processedContent = linkifyPhoneNumbersInMarkdown(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={MarkdownComponents}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
