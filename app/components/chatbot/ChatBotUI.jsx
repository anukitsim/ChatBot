"use client";

import React, { useState, useEffect } from "react";
import { FiSend, FiMessageSquare, FiX, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ChatBubbleContent from "./ChatBubbleContent";
import { v4 as uuidv4 } from "uuid";
import { WindupChildren } from "windups";
import ScrollToBottom from "react-scroll-to-bottom";
import parseHtmlToJSXArray from "@/utils/parseHtmlToJSXArray";
// --- NEW IMPORTS for Markdown conversion ---
import { remark } from "remark";
import remarkHtml from "remark-html";
import parseMarkdownToJSXArray from "@/utils/parseMarkdownToJSXArray";

// ---------------------------
// Styled Components (unchanged)
// ---------------------------
const ChatContainer = styled.div`
  font-family: "Poppins", sans-serif;
`;

const ChatBubbleIcon = styled(motion.button)`
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
  width: 360px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #e5703a;
  border-radius: 12px;
  position: absolute;
  bottom: 70px;
  right: 0;
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
  background-color: ${({ type }) =>
    type === "bot" ? "transparent" : "#e5703a"};
  color: ${({ type }) => (type === "bot" ? "#333" : "#fff")};
  padding: 10px 12px;
  border-radius: 16px;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.5;
  border: ${({ type }) =>
    type === "bot" ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
  box-shadow: ${({ type }) =>
    type === "bot" ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
  backdrop-filter: blur(10px);
  background-clip: padding-box;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #e5703a;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const chatBoxVariants = {
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

// const NAV_TYPES = {
//   SUBTOPICS: "subtopics",
//   FOLLOW_UPS: "followUps",
//   FOLLOW_UP_RESPONSE: "followUpResponse",
// };

export default function ChatBotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  // Commenting out WordPress KB states
  // const [knowledgeBase, setKnowledgeBase] = useState([]);
  // const [selectedMainTopic, setSelectedMainTopic] = useState(null);
  // const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  // const [navigationStack, setNavigationStack] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Commented out WP data fetch on mount
  /*
  useEffect(() => {
    async function loadKB() {
      try {
        const res = await fetch(
          "https://chatbot-c8e790.ingress-baronn.ewp.live/wp-json/kb/v1/topics/"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch from WP");
        }
        const data = await res.json();
        // Transform WP data → old shape
        const newKB = data.map((topic) => {
          return {
            mainTopic: topic.mainTopic,
            description: topic.description,
            subtopics: topic.subtopics.map((sub) => ({
              subtopic: sub.subtopic,
              // Convert raw HTML to an array of strings/JSX
              response: parseHtmlToJSXArray(sub.response),
              followUpOptions: sub.followUpOptions || [],
            })),
          };
        });
        setKnowledgeBase(newKB);
      } catch (err) {
        console.error("Error fetching knowledge base:", err);
      }
    }
    loadKB();
  }, []);
  */

  // On open, simply add a greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addGreeting();
    }
  }, [isOpen]);

  // Greeting: updated message and source changed to "pinecone"
  const addGreeting = () => {
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
  };

  // Commenting out WordPress-specific functions
  /*
  const addMainTopics = () => {
    if (!knowledgeBase || knowledgeBase.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: ["Loading topics, please wait..."],
          source: "wp",
        },
      ]);
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "topicList",
        topics: knowledgeBase.map((topic) => topic.mainTopic),
        typed: true,
        source: "wp",
      },
    ]);
  };

  const handleMainTopicClick = (mainTopic) => {
    setSelectedMainTopic(mainTopic);
    setSelectedSubtopic(null);
    setNavigationStack([{ type: NAV_TYPES.SUBTOPICS, data: mainTopic }]);
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), type: "user", content: mainTopic, source: "user" },
    ]);
    setIsBotTyping(true);
    setTimeout(() => {
      const mainTopicObj = knowledgeBase.find(
        (topic) => topic.mainTopic === mainTopic
      );
      if (mainTopicObj) {
        const subNames = mainTopicObj.subtopics.map((s) => s.subtopic);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "subtopicCard",
            description: mainTopicObj.description || "",
            subtopics: subNames,
            typed: true,
            source: "wp",
          },
        ]);
      }
      setIsBotTyping(false);
    }, 1200);
  };

  const handleSubtopicClick = (subtopic) => {
    setSelectedSubtopic(subtopic);
    setNavigationStack((prev) => {
      const updated = [
        ...prev.filter((entry) => entry.type !== NAV_TYPES.FOLLOW_UPS),
        { type: NAV_TYPES.FOLLOW_UPS, data: subtopic },
      ];
      return updated;
    });
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), type: "user", content: subtopic, source: "user" },
    ]);
    setIsBotTyping(true);
    setTimeout(() => {
      const mainTopicObj = knowledgeBase.find(
        (t) => t.mainTopic === selectedMainTopic
      );
      if (!mainTopicObj) {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: ["No main topic found."],
            source: "wp",
          },
        ]);
        setIsBotTyping(false);
        return;
      }
      const subObj = mainTopicObj.subtopics.find(
        (s) => s.subtopic === subtopic
      );
      if (!subObj) {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: ["Subtopic not found."],
            source: "wp",
          },
        ]);
        setIsBotTyping(false);
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: subObj.response,
          subtopicName: subObj.subtopic,
          hasCallback: true,
          typed: false,
          source: "wp",
        },
      ]);
      setIsBotTyping(false);
    }, 1200);
  };

  const handleFollowUpClick = (target) => {
    setIsBotTyping(true);
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), type: "user", content: target, source: "user" },
    ]);
    setNavigationStack((prev) => [
      ...prev.filter((e) => e.type !== NAV_TYPES.FOLLOW_UP_RESPONSE),
      { type: NAV_TYPES.FOLLOW_UP_RESPONSE, data: target },
    ]);
    setTimeout(() => {
      const mainTopicObj = knowledgeBase.find(
        (topic) => topic.mainTopic === selectedMainTopic
      );
      if (!mainTopicObj) {
        botReply("Sorry, no main topic found.");
        return;
      }
      const currentSub = mainTopicObj.subtopics.find(
        (s) => s.subtopic === selectedSubtopic
      );
      if (!currentSub) {
        botReply("No subtopic found.");
        return;
      }
      const followUp = currentSub.followUpOptions.find(
        (f) => f.target === target
      );
      if (!followUp) {
        const fallbackSub = mainTopicObj.subtopics.find(
          (s) => s.subtopic === target
        );
        if (!fallbackSub) {
          botReply("No follow-up found.");
          return;
        } else {
          setSelectedSubtopic(target);
          setMessages((prev) => [
            ...prev,
            {
              id: uuidv4(),
              type: "bot",
              content: fallbackSub.response,
              subtopicName: fallbackSub.subtopic,
              hasCallback: true,
              typed: false,
              source: "wp",
            },
          ]);
          setIsBotTyping(false);
          return;
        }
      }
      const followUpSubtopic = mainTopicObj.subtopics.find(
        (s) => s.subtopic === followUp.target
      );
      if (followUpSubtopic) {
        setSelectedSubtopic(followUpSubtopic.subtopic);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: followUpSubtopic.response,
            subtopicName: followUpSubtopic.subtopic,
            hasCallback: true,
            typed: false,
            source: "wp",
          },
        ]);
      } else {
        botReply("Sorry, no response found for that follow-up.");
      }
      setIsBotTyping(false);
    }, 1200);
  };

  function showSubtopicFollowUps(subtopicName) {
    const mainTopicObj = knowledgeBase.find(
      (t) => t.mainTopic === selectedMainTopic
    );
    if (!mainTopicObj) return;
    const stObj = mainTopicObj.subtopics.find(
      (s) => s.subtopic === subtopicName
    );
    if (stObj && stObj.followUpOptions?.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "followUpOptions",
          followUpOptions: stObj.followUpOptions,
          typed: true,
          source: "wp",
        },
      ]);
    }
  }
  */

  // Send bot reply helper for errors (unchanged)
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

  // --- handleSend function remains unchanged ---
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    // Add user message
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
      const rawReplyText =
        typeof rawReply === "string" ? rawReply : String(rawReply);

      // For pinecone responses, use our dedicated markdown-to-JSX converter.
      const parsedContent = await parseMarkdownToJSXArray(rawReplyText);

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: parsedContent, // an array of JSX segments
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
    setIsOpen((prev) => !prev);
  };

  // Simplified typewriter finish handler – removed WP follow-up logic
  const handleTypewriterDone = (message) => {
    if (!message.hasCallback) return;

    setMessages((prev) =>
      prev.map((m) =>
        m.id === message.id ? { ...m, hasCallback: false, typed: true } : m
      )
    );
    setIsBotTyping(false);
  };

  // Removed handleBackClick as it's related to WP navigation

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
                {messages.map((msg) => {
                  // Removed rendering for topicList, subtopicCard, and followUpOptions
                  // Render normal text messages only
                  return (
                    <ChatMessage key={msg.id} type={msg.type}>
                      <ChatBubbleContent
                        content={msg.content}
                        type={msg.type}
                        typed={msg.typed}
                        onTypeDone={() => handleTypewriterDone(msg)}
                        onTypeProgress={() => {}}
                        source={msg.source}
                      />
                    </ChatMessage>
                  );
                })}

                {isBotTyping && (
                  <LoaderWrapper>
                    <Spinner />
                  </LoaderWrapper>
                )}
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
