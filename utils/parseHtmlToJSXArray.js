"use client";

import parse, { domToReact } from "html-react-parser";
import React from "react";

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
        // Debug: Log each node so you can see what's being parsed
        // NOTE: uncomment if you need to see exactly which node is failing
        // console.log("Parsing domNode:", domNode);

        // 1) Handle Text Node
        if (domNode.type === "text") {
          return domNode.data; // plain string
        }

        // 2) Handle Comments/Directives/Scripts/etc.
        if (
          domNode.type === "comment" ||
          domNode.type === "script" ||
          domNode.type === "directive" ||
          domNode.name === "style"  // skip <style> if present
        ) {
          return null; // skip
        }

        // 3) Handle Tag Nodes
        if (domNode.type === "tag") {
          // If domNode.name is not a valid string, skip
          if (typeof domNode.name !== "string" || !domNode.name) {
            return null;
          }
          // Recursively convert children
          const children = domToReact(domNode.children, {
            replace: (childNode) => {
              if (childNode.type === "text") {
                return childNode.data; // plain string
              }
              // Let parser handle nested tags by returning undefined
              return undefined;
            },
          });
          // Return a valid React element
          return React.createElement(
            domNode.name,
            { key: getKey(), ...domNode.attribs },
            children
          );
        }

        // 4) Fallback - skip unknown node types
        return null;
      },
    })
  );
}

/**
 * ensureArray: If parse(...) returns a single element/string,
 * wrap it in an array so we always return an array of segments.
 */
function ensureArray(parsedResult) {
  if (Array.isArray(parsedResult)) {
    return parsedResult;
  }
  return [parsedResult];
}
