"use client";

import React from "react";
import parse, { domToReact } from "html-react-parser";

/**
 * Pre-process the HTML string by replacing phone numbers with clickable links.
 *
 * This function looks for phone numbers in the format:
 *    + (995) 574 20 20 20   or   +995 574 20 20 20
 */
function linkifyPhoneNumbersInHTML(html) {
  // This regex should match your phone number examples.
  const phoneRegex = /(\+?\s*\(?\d{1,4}\)?[\d\-\s\(\)]{7,}\d)/g;
  return html.replace(phoneRegex, (match) => {
    // Remove spaces for the href value.
    const telNumber = match.replace(/\s+/g, "");
    return `<a href="tel:${telNumber}" style="color: #e5703a; text-decoration: underline;">${match}</a>`;
  });
}

/**
 * Updated helper function to process text nodes and convert phone numbers
 * into clickable <a href="tel:..."> links.
 */
function processTextNode(text) {
  // Updated regex to match phone numbers such as:
  // "+995 574 20 20 20" or "+ (995) 574 20 20 20"
  const phoneRegex = /(\+?\s*\(?\d{1,4}\)?[\d\-\s\(\)]{7,}\d)/g;
  const parts = text.split(phoneRegex);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (phoneRegex.test(part)) {
      // Remove whitespace for the tel: href so it works properly on mobile
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
  return `wp-html-${globalKey++}`;
}

/**
 * parseHtmlToJSXArray
 * Converts a raw HTML string into an array of [string | ReactElement].
 */
export default function parseHtmlToJSXArray(htmlString) {
  if (!htmlString) return [];

  // Pre-process the HTML to inject clickable phone links.
  const processedHtml = linkifyPhoneNumbersInHTML(htmlString);

  return ensureArray(
    parse(processedHtml, {
      replace: (domNode) => {
        // 1) Handle Text Nodes
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
            // Style links
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
            // Removed the conditional that removed bullets for list items that only contain a link.
            customProps.style = {
              marginBottom: "0.5em",
              ...customProps.style,
            };
            customProps.className = customProps.className
              ? customProps.className + " rich-list-item"
              : "rich-list-item";
          }

          // Recursively process children (including phone number replacement)
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
