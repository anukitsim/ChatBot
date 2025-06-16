"use client";

import React, { useState, useEffect } from "react";
import { FiSend, FiMessageSquare, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatBubbleContent from "./ChatBubbleContent";
import parseMarkdownToJSXArray from "@/utils/parseMarkdownToJSXArray";

/* ------------------------------------------------------------------
   TypingDots – three animated dots that blink in sequence            
-------------------------------------------------------------------*/
const blink = keyframes`
  0%   { opacity: .2; }
  20%  { opacity: 1;  }
  100% { opacity: .2; }
`;
const Dot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 2px;
  border-radius: 50%;
  background: #999;
  animation: ${blink} 1.2s infinite;
  animation-delay: ${({ $i }) => $i * 0.2}s;
`;
const TypingDots = () => (
  <span aria-label="Bot is typing">
    <Dot $i={0} />
    <Dot $i={1} />
    <Dot $i={2} />
  </span>
);

/* ------------------------------------------------------------------
   Styled components (unchanged except where noted)                  
-------------------------------------------------------------------*/
const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  font-family: "Poppins", sans-serif;
  background: transparent;
`;

const ChatBubbleIcon = styled(motion.button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  background-color: #e5703a;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, background-color 0.3s;
  pointer-events: auto;
  &:hover {
    transform: scale(1.05);
    background-color: #d55d2f;
  }
`;

const ChatBox = styled(motion.div)`
  position: fixed;
  bottom: calc(60px + 32px);
  right: 24px;
  width: 360px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #e5703a;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
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
  background: #fff;
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
  transition: transform 0.15s, background-color 0.2s;
  pointer-events: auto;
  &:hover {
    transform: scale(1.05);
    background-color: #d55d2f;
  }
`;

const ChatMessage = styled.div`
  align-self: ${({ $type }) => ($type === "bot" ? "flex-start" : "flex-end")};
  background-color: ${({ $type }) =>
    $type === "bot" ? "transparent" : "#e5703a"};
  color: ${({ $type }) => ($type === "bot" ? "#333" : "#fff")};
  padding: 10px 12px;
  border-radius: 16px;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.5;
  border: ${({ $type }) =>
    $type === "bot" ? "1px solid rgba(0,0,0,0.1)" : "none"};
  box-shadow: ${({ $type }) =>
    $type === "bot" ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
  backdrop-filter: blur(10px);
  background-clip: padding-box;
`;

const chatBoxVariants = {
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

const LangToggle = styled.div`
  display: flex;
  gap: 6px;
  button {
    background: transparent;
    border: none;
    color: #fff;
    font-weight: 200;
    cursor: pointer;
    opacity: 0.6;
    &[data-active="true"] {
      opacity: 1;
    }
  }
`;

const i18n = {
  en: {
    header: "Mardi chat",
    placeholder: "Ask your question here…",
    greeting: "Welcome to Mardi Holding! How can we assist you today?",
  },
  ka: {
    // Georgian
    header: "ჩატი",
    placeholder: "შეიყვანეთ შეტყობინება...",
    greeting: "გამარჯობა! რით შეგვიძლია დაგეხმაროთ?",
  },
  ru: {
    // Russian
    header: "Чат Mardi",
    placeholder: "Введите сообщение...",
    greeting: "Здравствуйте! Чем можем помочь?",
  },
};

/* ------------------------------------------------------------------
   Main Component                                                    
-------------------------------------------------------------------*/
export default function ChatBotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");

  const inputRef = React.useRef(null);


               

  /* ---------------- Size sync with parent -----------------------*/
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent !== window) {
      let width = 100,
        height = 100;
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

  /* ---------------- First greeting ------------------------------*/
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          type: "bot",
          content: [i18n[lang].greeting],
          isGreeting: true,
          typed: false,
        },
      ]);
    }
  }, [isOpen, lang]);

  /* ---------------- Keep greeting translated -------------------*/
  useEffect(() => {
    if (!isOpen) return; // do nothing if chat is closed
    setMessages((m) =>
      m.map((msg) =>
        msg.isGreeting
          ? {
              ...msg,
              content: [i18n[lang].greeting],
              typed: false, // ← reset so ChatBubbleContent re-types
            }
          : msg
      )
    );
  }, [lang]); // ← runs whenever language switches

  /* ---------------- Send handler --------------------------------*/
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    // Push user message
    setMessages((m) => [
      ...m,
      { id: uuidv4(), type: "user", content: text, typed: true },
    ]);

    // Push placeholder bot message with typing dots
    const placeholderId = uuidv4();
    setMessages((m) => [
      ...m,
      {
        id: placeholderId,
        type: "bot",
        content: [<TypingDots key="dots" />],
        placeholder: true,
        typed: true,
      },
    ]);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language: lang }),
      });
      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      const raw =
        typeof data.reply === "string" ? data.reply : String(data.reply);
      const parsed = await parseMarkdownToJSXArray(raw);

      // Replace placeholder with real reply
      setMessages((m) => [
        ...m.filter((msg) => msg.id !== placeholderId),
        { id: uuidv4(), type: "bot", content: parsed, typed: false },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m.filter((msg) => msg.id !== placeholderId),
        {
          id: uuidv4(),
          type: "bot",
          content: ["There was an error. Please try again."],
        },
      ]);
    }
  };

  const handleTypeDone = (id, isGreeting) => {
    setMessages(m => m.map(msg =>
      msg.id === id ? {...msg, typed:true } : msg));

      // If that was the greeting, move cursor to the input
      if (isGreeting && inputRef.current) {
        inputRef.current.focus();
      }
    };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };
  const toggleChat = () => setIsOpen((o) => !o);

  const handleLanguageSwitch = (newLang) => {
    if (newLang === lang) return;
    setLang(newLang);
    setMessages([]);  
    setInput("");
  };

  return (
    <ChatContainer>
      <ChatBubbleIcon onClick={toggleChat} aria-label="Toggle chat">
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
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
            <ChatHeader>
              {i18n[lang].header}
              <LangToggle>
                {["en", "ru", "ka"].map((l) => (
                  <button
                    key={l}
                    data-active={l === lang}
                    onClick={() => handleLanguageSwitch(l)} 
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </LangToggle>
            </ChatHeader>
            <StyledScrollContainer>
              <ChatContent>
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} $type={msg.type}>
                    <ChatBubbleContent
                      content={msg.content}
                      type={msg.type}
                      // no typewriter effect for placeholder / dots
                      typed={msg.typed}
                      onTypeDone={() => handleTypeDone(msg.id, msg.isGreeting)}
                    />
                  </ChatMessage>
                ))}
              </ChatContent>
            </StyledScrollContainer>
            <ChatFooter>
              <ChatInputContainer>
                <ChatInput
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={i18n[lang].placeholder}
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
