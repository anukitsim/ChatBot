// utils/parseMarkdownToJSXArray.js
"use client";

import React from "react";
import parse, { domToReact } from "html-react-parser";
import { remark } from "remark";
import remarkHtml from "remark-html";

/**
 * Replace phone numbers with clickable links.
 */
function linkifyPhoneNumbersInHTML(html) {
  const phoneRegex = /(\+?\s*\(?\d{1,4}\)?[\d\-\s\(\)]{7,}\d)/g;
  return html.replace(phoneRegex, (match) => {
    const telNumber = match.replace(/\s+/g, "");
    return `<a href="tel:${telNumber}" style="color: #e5703a; text-decoration: underline;">${match}</a>`;
  });
}

/**
 * Processes text nodes to convert phone numbers to clickable links.
 */
function processTextNode(text) {
  const phoneRegex = /(\+?\s*\(?\d{1,4}\)?[\d\-\s\(\)]{7,}\d)/g;
  const parts = text.split(phoneRegex);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (phoneRegex.test(part)) {
      const telNumber = part.replace(/\s+/g, "");
      return (
        <a
          key={`phone-${index}`}
          href={`tel:${telNumber}`}
          style={{ color: "#e5703a", textDecoration: "underline" }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

// Simple global key generator for unique keys.
let globalKey = 0;
function getKey() {
  return `md-html-${globalKey++}`;
}

/**
 * Converts a markdown string into an array of JSX elements.
 * This version ensures that links have target="_blank" and rel="noopener noreferrer".
 */
export default async function parseMarkdownToJSXArray(markdownString) {
  if (!markdownString) return [];

  // Convert markdown to HTML using remark.
  const processed = await remark().use(remarkHtml).process(markdownString);
  const htmlString = processed.toString();

  // Optionally, apply phone number linkification.
  const processedHtml = linkifyPhoneNumbersInHTML(htmlString);

  // Parse the HTML into JSX.
  const jsx = parse(processedHtml, {
    replace: (domNode) => {
      // Handle text nodes.
      if (domNode.type === "text") {
        return processTextNode(domNode.data);
      }
      // Skip comments, scripts, directives, and style tags.
      if (
        domNode.type === "comment" ||
        domNode.type === "script" ||
        domNode.type === "directive" ||
        domNode.name === "style"
      ) {
        return null;
      }
      if (domNode.type === "tag") {
        if (typeof domNode.name !== "string" || !domNode.name) {
          return null;
        }
        let customProps = { key: getKey(), ...domNode.attribs };

        if (domNode.name === "a") {
          // **Ensure links open in a new tab.**
          customProps = {
            ...customProps,
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              color: "#e5703a",
              textDecoration: "underline",
              ...customProps.style,
            },
            className: customProps.className
              ? customProps.className + " rich-link"
              : "rich-link",
          };
        } else if (domNode.name === "ul") {
          customProps = {
            ...customProps,
            style: {
              paddingLeft: "20px",
              marginBottom: "1em",
              listStyleType: "disc",
              ...customProps.style,
            },
            className: customProps.className
              ? customProps.className + " rich-list"
              : "rich-list",
          };
        } else if (domNode.name === "ol") {
          customProps = {
            ...customProps,
            style: {
              paddingLeft: "20px",
              marginBottom: "1em",
              listStyleType: "decimal",
              ...customProps.style,
            },
            className: customProps.className
              ? customProps.className + " rich-list"
              : "rich-list",
          };
        } else if (domNode.name === "li") {
          customProps = {
            ...customProps,
            style: {
              marginBottom: "0.5em",
              ...customProps.style,
            },
            className: customProps.className
              ? customProps.className + " rich-list-item"
              : "rich-list-item",
          };
        }

        // Recursively process children.
        const children = domToReact(domNode.children, {
          replace: (childNode) => {
            if (childNode.type === "text") {
              return processTextNode(childNode.data);
            }
            return undefined;
          },
        });
        return React.createElement(domNode.name, customProps, children);
      }
      return null;
    },
  });

  return Array.isArray(jsx) ? jsx : [jsx];
}
