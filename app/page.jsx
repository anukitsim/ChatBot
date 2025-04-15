// app/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ChatBotUI = dynamic(
  () => import("./components/chatbot/ChatBotUI"),
  { ssr: false }
);

const Chat = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents mismatched server/client output

  return (
    <div>
      <ChatBotUI />
    </div>
  );
};

export default Chat;
