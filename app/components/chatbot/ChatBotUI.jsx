// components/chatbot/ChatBotUI.jsx
"use client";

import React, { useState, useEffect } from "react";
import { FiSend, FiMessageSquare, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatBubbleContent from "./ChatBubbleContent";
import parseMarkdownToJSXArray from "@/utils/parseMarkdownToJSXArray";

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;          /* click-through everywhere */
  font-family: "Poppins", sans-serif;
  background: transparent;
`;

const ChatBubbleIcon = styled(motion.button)`
  position: fixed;               /* pin to iframe viewport */
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background-color: #e5703a;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, background-color 0.3s;
  pointer-events: auto;          /* bubble catches clicks */
  outline: none;
  &:hover {
    transform: scale(1.05);
    background-color: #d55d2f;
  }
`;

const ChatBox = styled(motion.div)`
  position: fixed;               /* pin to iframe viewport */
  bottom: 60px;                  /* 20px gap + 60px bubble */
  right: 0;
  width: 360px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #e5703a;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;          /* chat window catches clicks */
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
  padding: 12px;
  gap: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar { display: none; }
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
  background-color: #fff;
  &::placeholder { color: #aaa; }
`;

const SendButton = styled.button`
  background-color: #e5703a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s;
  pointer-events: auto;
  &:hover {
    transform: scale(1.05);
    background-color: #d55d2f;
  }
`;

const ChatMessage = styled.div`
  align-self: ${({ type }) => (type === "bot" ? "flex-start" : "flex-end")};
  background-color: ${({ type }) => (type === "bot" ? "transparent" : "#e5703a")};
  color: ${({ type }) => (type === "bot" ? "#333" : "#fff")};
  padding: 10px 12px;
  border-radius: 16px;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.5;
  border: ${({ type }) =>
    type === "bot" ? "1px solid rgba(0,0,0,0.1)" : "none"};
  box-shadow: ${({ type }) =>
    type === "bot" ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
  backdrop-filter: blur(10px);
  background-clip: padding-box;
`;

const chatBoxVariants = {
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 0 },
};

export default function ChatBotUI() {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Post size to parent on open/close or content change
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent !== window) {
      let width = 100, height = 100; // closed: 100×100
      if (isOpen) {
        const box = document.querySelector(".chat-box");
        if (box) {
          const rect = box.getBoundingClientRect();
          width = Math.round(rect.width);
          height = Math.round(rect.height);
        }
      }
      window.parent.postMessage(
        { type: "CHATBOT_SIZE", open: isOpen, width, height },
        "*"
      );
    }
  }, [isOpen, messages.length]);

  // Greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: uuidv4(),
        type: "bot",
        content: ["Welcome to Mardi! please ask your question."],
        hasCallback: true,
        typed: false,
        source: "pinecone",
      }]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages(m => [...m, { id: uuidv4(), type: "user", content: text, source: "user" }]);
    setIsBotTyping(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const raw  = typeof data.reply === "string" ? data.reply : String(data.reply);
      const parsed = await parseMarkdownToJSXArray(raw);

      setMessages(m => [...m, {
        id: uuidv4(),
        type: "bot",
        content: parsed,
        hasCallback: true,
        typed: false,
        source: "pinecone",
      }]);
    } catch (err) {
      console.error(err);
      setMessages(m => [...m, {
        id: uuidv4(),
        type: "bot",
        content: ["There was an error. Please try again."],
        hasCallback: false,
        typed: true,
        source: "pinecone",
      }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleKeyPress = e => { if (e.key === "Enter") handleSend(); };
  const toggleChat     = () => setIsOpen(o => !o);
  const handleTypeDone = msg => {
    if (!msg.hasCallback) return;
    setMessages(m => m.map(x => x.id === msg.id ? { ...x, hasCallback: false, typed: true } : x));
    setIsBotTyping(false);
  };

  return (
    <ChatContainer>
      <ChatBubbleIcon onClick={toggleChat} aria-label="Toggle chat">
        {isOpen ? <FiX size={24}/> : <FiMessageSquare size={24}/>}
      </ChatBubbleIcon>

      <AnimatePresence>
        {isOpen && (
          <ChatBox
            className="chat-box"
            variants={chatBoxVariants}
            initial="exit"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>Chat With Us</ChatHeader>
            <StyledScrollContainer>
              <ChatContent>
                {messages.map(msg => (
                  <ChatMessage key={msg.id} type={msg.type}>
                    <ChatBubbleContent
                      content={msg.content}
                      type={msg.type}
                      typed={msg.typed}
                      onTypeDone={() => handleTypeDone(msg)}
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
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  aria-label="Type your message"
                />
                <SendButton onClick={handleSend} aria-label="Send message">
                  <FiSend size={16}/>
                </SendButton>
              </ChatInputContainer>
            </ChatFooter>
          </ChatBox>
        )}
      </AnimatePresence>
    </ChatContainer>
  );
}
