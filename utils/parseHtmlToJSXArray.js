"use client";

import parse, { domToReact } from "html-react-parser";
import React from "react";

// Optional: Helper function to process text nodes for emails and phone numbers (if desired)
function processTextNode(text) {
  return text;
}

// Simple global key generator
let globalKey = 0;
function getKey() {
  return `wp-html-${globalKey++}`;
}

/**
 * parseHtmlToJSXArray
 * Converts a raw HTML string into an array of [string | ReactElement].
 */
export default function parseHtmlToJSXArray(htmlString) {
  if (!htmlString) return [];

  return ensureArray(
    parse(htmlString, {
      replace: (domNode) => {
        // 1) Handle Text Node
        if (domNode.type === "text") {
          return processTextNode(domNode.data);
        }

        // 2) Skip comments, scripts, directives, and style tags
        if (
          domNode.type === "comment" ||
          domNode.type === "script" ||
          domNode.type === "directive" ||
          domNode.name === "style"
        ) {
          return null;
        }

        // 3) Handle Tag Nodes with custom styling/class names
        if (domNode.type === "tag") {
          if (typeof domNode.name !== "string" || !domNode.name) {
            return null;
          }
          let customProps = { key: getKey(), ...domNode.attribs };

          if (domNode.name === "a") {
            // Apply inline styles so that every link is distinguished
            customProps.style = {
              color: "#e5703a",
              textDecoration: "underline",
              ...customProps.style,
            };
            customProps.className = customProps.className
              ? customProps.className + " rich-link"
              : "rich-link";
          } else if (domNode.name === "ul") {
            // Force disc bullets and add padding/margin for unordered lists
            customProps.style = {
              paddingLeft: "20px",
              marginBottom: "1em",
              listStyleType: "disc",
              ...customProps.style,
            };
            customProps.className = customProps.className
              ? customProps.className + " rich-list"
              : "rich-list";
          } else if (domNode.name === "ol") {
            // For ordered lists: use decimal markers
            customProps.style = {
              paddingLeft: "20px",
              marginBottom: "1em",
              listStyleType: "decimal",
              ...customProps.style,
            };
            customProps.className = customProps.className
              ? customProps.className + " rich-list"
              : "rich-list";
          } else if (domNode.name === "li") {
            // Check if this <li> contains only a link; if so, remove the bullet marker.
            const childrenNodes = domNode.children || [];
            const isOnlyLink =
              childrenNodes.length === 1 &&
              childrenNodes[0].type === "tag" &&
              childrenNodes[0].name === "a";
            customProps.style = {
              marginBottom: "0.5em",
              listStyleType: isOnlyLink ? "none" : "inherit",
              ...customProps.style,
            };
            customProps.className = customProps.className
              ? customProps.className + " rich-list-item"
              : "rich-list-item";
          }

          // Recursively convert children. For text children, process them as needed.
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

        // 4) Fallback: skip unknown node types
        return null;
      },
    })
  );
}

/**
 * ensureArray: Wraps a single element/string in an array if needed.
 */
function ensureArray(parsedResult) {
  return Array.isArray(parsedResult) ? parsedResult : [parsedResult];
}
