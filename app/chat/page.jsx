// app/chat/page.jsx
"use client";
import React from "react";
import ChatBotUI from "../components/chatbot/ChatBotUI";

export default function ChatPage() {
  return (
    <>
      <style jsx global>{`
        /* Make the iframe’s root fill the viewport & be transparent */
        html,
        body,
        #__next {
          height: 100%;
          margin: 0;
          padding: 0;
          background: transparent !important;
        }
      `}</style>
      <ChatBotUI />
    </>
  );
}
