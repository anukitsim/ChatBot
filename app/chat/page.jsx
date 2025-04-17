// app/chat/page.jsx
"use client";
import React from "react";
import ChatBotUI from "../components/chatbot/ChatBotUI";

export default function ChatPage() {
  return (
    <>
      {/* force the iframe’s underlying HTML/body to be transparent */}
      <style jsx global>{`
        html,
        body,
        #__next {
          background: transparent !important;
        }
      `}</style>

      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "transparent",
        }}
      >
        <ChatBotUI />
      </div>
    </>
  );
}
