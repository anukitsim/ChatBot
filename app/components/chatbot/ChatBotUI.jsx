"use client";

import React, { useState, useEffect } from "react";
import { FiSend, FiMessageSquare, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ChatBubbleContent from "./ChatBubbleContent";
import { v4 as uuidv4 } from "uuid";
import ScrollToBottom from "react-scroll-to-bottom";
import parseMarkdownToJSXArray from "@/utils/parseMarkdownToJSXArray";

// 1) Make the container "relative" and fill the iframe
const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "Poppins", sans-serif;
`;

const ChatBubbleIcon = styled(motion.button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #e5703a;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.15s;
  &:hover {
    background-color: #d55d2f;
    transform: scale(1.05);
  }
`;

const ChatBox = styled(motion.div)`
  position: absolute;
  bottom: 80px; /* 20px + 60px bubble = 80px total */
  right: 20px;
  width: 360px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #e5703a;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #333;
`;

const ChatHeader = styled.div`
  background-color: #e5703a;
  color: #fff;
  padding: 10px 14px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledScrollContainer = styled(ScrollToBottom).attrs({
  scrollBehavior: "smooth",
})`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatFooter = styled.div`
  border-top: 1px solid #eee;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #e5703a;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  color: #333;
  &::placeholder {
    color: #aaa;
  }
`;

const SendButton = styled.button`
  background-color: #e5703a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;
  &:hover {
    background-color: #d55d2f;
    transform: scale(1.05);
  }
`;

const ChatMessage = styled.div`
  align-self: ${({ type }) => (type === "bot" ? "flex-start" : "flex-end")};
  background-color: ${({ type }) => (type === "bot" ? "transparent" : "#e5703a")};
  color: ${({ type }) => (type === "bot" ? "#333" : "#fff")};
  padding: 10px 12px;
  border-radius: 16px;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.5;
  border: ${({ type }) => (type === "bot" ? "1px solid rgba(0, 0, 0, 0.1)" : "none")};
  box-shadow: ${({ type }) => (type === "bot" ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none")};
  backdrop-filter: blur(10px);
  background-clip: padding-box;
`;

const chatBoxVariants = {
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

export default function ChatBotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  // On open, if no messages, show greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addGreeting();
    }
  }, [isOpen]);

  function addGreeting() {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "bot",
        content: ["Welcome to Mardi! please ask your question."],
        hasCallback: true,
        typed: false,
        source: "pinecone",
      },
    ]);
  }

  function botReply(text) {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "bot",
        content: [text],
        hasCallback: true,
        typed: false,
        source: "pinecone",
      },
    ]);
    setIsBotTyping(false);
  }

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), type: "user", content: text, source: "user" },
    ]);
    setIsBotTyping(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      const rawReply = data.reply || "Error. Please try again.";
      const rawReplyText = typeof rawReply === "string" ? rawReply : String(rawReply);
      const parsedContent = await parseMarkdownToJSXArray(rawReplyText);

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: parsedContent,
          hasCallback: true,
          typed: false,
          source: "pinecone",
        },
      ]);
    } catch (err) {
      console.error("Error calling /api/chatbot:", err);
      botReply("There was an error. Please try again.");
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleTypewriterDone = (message) => {
    if (!message.hasCallback) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === message.id ? { ...m, hasCallback: false, typed: true } : m
      )
    );
    setIsBotTyping(false);
  };

  return (
    <ChatContainer>
      <ChatBubbleIcon onClick={toggleChat} aria-label="Open chat">
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </ChatBubbleIcon>

      <AnimatePresence>
        {isOpen && (
          <ChatBox
            variants={chatBoxVariants}
            initial="exit"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>Chat With Us</ChatHeader>
            <StyledScrollContainer>
              <ChatContent>
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} type={msg.type}>
                    <ChatBubbleContent
                      content={msg.content}
                      type={msg.type}
                      typed={msg.typed}
                      onTypeDone={() => handleTypewriterDone(msg)}
                      source={msg.source}
                    />
                  </ChatMessage>
                ))}
                {isBotTyping && <div>Loading…</div>}
              </ChatContent>
            </StyledScrollContainer>
            <ChatFooter>
              <ChatInputContainer>
                <ChatInput
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  aria-label="Type your message"
                />
                <SendButton onClick={handleSend} aria-label="Send message">
                  <FiSend size={16} />
                </SendButton>
              </ChatInputContainer>
            </ChatFooter>
          </ChatBox>
        )}
      </AnimatePresence>
    </ChatContainer>
  );
}
