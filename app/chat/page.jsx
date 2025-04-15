// app/chat/page.jsx
"use client";
import React from "react";
import ChatBotUI from "../components/chatbot/ChatBotUI";

export default function ChatPage() {
  // We'll remove "fixed" positioning from ChatBotUI, so it fits this page well:
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ChatBotUI />
    </div>
  );
}
