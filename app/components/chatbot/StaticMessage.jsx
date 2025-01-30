"use client";

import React from "react";

function StaticMessage({ content }) {
  if (Array.isArray(content)) {
    return (
      <div>
        {content.map((part, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
        ))}
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default StaticMessage;
