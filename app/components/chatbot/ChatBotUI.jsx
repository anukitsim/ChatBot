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

// ---------------------------
// Styled Components
// ---------------------------
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
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
  // This helps smooth out scroll jumps
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
  border: ${({ type }) =>
    type === "bot" ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
  box-shadow: ${({ type }) =>
    type === "bot" ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
  backdrop-filter: blur(10px);
  background-clip: padding-box;
`;

const CardContainer = styled.div`
  background-color: #fefefe;
  border-radius: 10px;
  padding: 16px;
  margin-top: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #e5703a;
`;

const CardDescription = styled.div`
  font-size: 14px;
  color: #e5703a;
  margin-bottom: 12px;
`;

const CardButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
`;

const CardButton = styled.button`
  background-color: #fff;
  color: #333;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 8px 10px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  width: 100%;
  &:hover {
    background-color: #e5703a;
    color: #fff;
    border-color: #e5703a;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #e5703a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s, transform 0.15s;
  width: 100%;
  text-align: left;
  margin-top: 10px;

  &:hover {
    background-color: #d55d2f;
    transform: scale(1.02);
  }
  svg {
    margin-right: 8px;
  }
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

const NAV_TYPES = {
  SUBTOPICS: "subtopics",
  FOLLOW_UPS: "followUps",
  FOLLOW_UP_RESPONSE: "followUpResponse",
};

export default function ChatBotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [selectedMainTopic, setSelectedMainTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [navigationStack, setNavigationStack] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  // 1. Fetch WP data on mount
  useEffect(() => {
    async function loadKB() {
      try {
        const res = await fetch("https://chatbot-c8e790.ingress-baronn.ewp.live/wp-json/kb/v1/topics");
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

  // 2. Open chat => show greeting if no messages
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addGreeting();
    }
  }, [isOpen]);

  // Greeting
  const addGreeting = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "bot",
        content: ["Hello! How can we assist you today? Choose a topic below:"],
        hasCallback: true,
        typed: false,
      },
    ]);
  };

  // Show main topics
  const addMainTopics = () => {
    if (!knowledgeBase || knowledgeBase.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: ["Loading topics, please wait..."],
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
      },
    ]);
  };

  // Handle main topic
  const handleMainTopicClick = (mainTopic) => {
    setSelectedMainTopic(mainTopic);
    setSelectedSubtopic(null);

    setNavigationStack([{ type: NAV_TYPES.SUBTOPICS, data: mainTopic }]);
    // user message
    setMessages((prev) => [...prev, { id: uuidv4(), type: "user", content: mainTopic }]);

    // Simulate bot typing
    setIsBotTyping(true);
    setTimeout(() => {
      const mainTopicObj = knowledgeBase.find((topic) => topic.mainTopic === mainTopic);
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
          },
        ]);
      }
      setIsBotTyping(false);
    }, 1200);
  };

  // Handle subtopic
  const handleSubtopicClick = (subtopic) => {
    setSelectedSubtopic(subtopic);

    setNavigationStack((prev) => {
      const updated = [
        ...prev.filter((entry) => entry.type !== NAV_TYPES.FOLLOW_UPS),
        { type: NAV_TYPES.FOLLOW_UPS, data: subtopic },
      ];
      return updated;
    });

    // user message
    setMessages((prev) => [...prev, { id: uuidv4(), type: "user", content: subtopic }]);

    setIsBotTyping(true);
    setTimeout(() => {
      const mainTopicObj = knowledgeBase.find((t) => t.mainTopic === selectedMainTopic);
      if (!mainTopicObj) {
        setMessages((prev) => [
          ...prev,
          { id: uuidv4(), type: "bot", content: ["No main topic found."] },
        ]);
        setIsBotTyping(false);
        return;
      }

      const subObj = mainTopicObj.subtopics.find((s) => s.subtopic === subtopic);
      if (!subObj) {
        setMessages((prev) => [
          ...prev,
          { id: uuidv4(), type: "bot", content: ["Subtopic not found."] },
        ]);
        setIsBotTyping(false);
        return;
      }

      // Add the subtopic's content & store subtopicName
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: subObj.response,
          subtopicName: subObj.subtopic, // keep track
          hasCallback: true,
          typed: false,
        },
      ]);
      setIsBotTyping(false);
    }, 1200);
  };

  // Handle follow-up click
  const handleFollowUpClick = (target) => {
    setIsBotTyping(true);

    // user message
    setMessages((prev) => [...prev, { id: uuidv4(), type: "user", content: target }]);

    setNavigationStack((prev) => [
      ...prev.filter((e) => e.type !== NAV_TYPES.FOLLOW_UP_RESPONSE),
      { type: NAV_TYPES.FOLLOW_UP_RESPONSE, data: target },
    ]);

    setTimeout(() => {
      const mainTopicObj = knowledgeBase.find((topic) => topic.mainTopic === selectedMainTopic);
      if (!mainTopicObj) {
        botReply("Sorry, no main topic found.");
        return;
      }

      // Current subtopic
      const currentSub = mainTopicObj.subtopics.find((s) => s.subtopic === selectedSubtopic);
      if (!currentSub) {
        botReply("No subtopic found.");
        return;
      }

      // Check if followUp is in the current subtopic
      const followUp = currentSub.followUpOptions.find((f) => f.target === target);
      if (!followUp) {
        // Maybe the target is a subtopic in same main topic
        const fallbackSub = mainTopicObj.subtopics.find((s) => s.subtopic === target);
        if (!fallbackSub) {
          botReply("No follow-up found.");
          return;
        } else {
          // We found a subtopic in the same topic matching "target"
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
            },
          ]);
          setIsBotTyping(false);
          return;
        }
      }

      // We found a matching followUp inside current subtopic
      // Usually the .target is also a subtopic. Let's see:
      const followUpSubtopic = mainTopicObj.subtopics.find((s) => s.subtopic === followUp.target);
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
          },
        ]);
      } else {
        botReply("Sorry, no response found for that follow-up.");
      }

      setIsBotTyping(false);
    }, 1200);
  };

  // Simple helper to send a quick bot reply
  function botReply(text) {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "bot",
        content: [text],
        hasCallback: true,
        typed: false,
      },
    ]);
    setIsBotTyping(false);
  }

  // Send user typed text
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    // user message
    setMessages((prev) => [...prev, { id: uuidv4(), type: "user", content: text }]);
    setIsBotTyping(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const reply = data.reply || "Error. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: [reply],
          hasCallback: true,
          typed: false,
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

  // Called when the typed text finishes
const handleTypewriterDone = (message) => {
  if (!message.hasCallback) return;

  // Mark this message fully typed
  setMessages((prev) =>
    prev.map((m) =>
      m.id === message.id ? { ...m, hasCallback: false, typed: true } : m
    )
  );

  setIsBotTyping(false);

  // 1) Fix .includes(...) by checking the type of content[0]
  if (
    message.type === "bot" &&
    Array.isArray(message.content) &&
    message.content.length > 0 &&
    typeof message.content[0] === "string" &&
    message.content[0].includes("Choose a topic below:")
  ) {
    addMainTopics();
    return;
  }

  // 2) If this bot message is from a subtopic, automatically show follow-ups
  //    (assuming you stored subtopicName on the message earlier)
  if (message.subtopicName) {
    const mainTopicObj = knowledgeBase.find(
      (t) => t.mainTopic === selectedMainTopic
    );
    if (mainTopicObj) {
      const stObj = mainTopicObj.subtopics.find(
        (s) => s.subtopic === message.subtopicName
      );
      if (stObj?.followUpOptions?.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "followUpOptions",
            followUpOptions: stObj.followUpOptions,
            typed: true,
          },
        ]);
      }
    }
  }
};

  // Handle back button
  const handleBackClick = () => {
    if (navigationStack.length === 0) {
      return;
    }

    const newStack = [...navigationStack];
    const lastStep = newStack.pop();
    setNavigationStack(newStack);

    if (lastStep.type === NAV_TYPES.FOLLOW_UP_RESPONSE) {
      // Return to the subtopic we had
      setSelectedSubtopic(lastStep.data);
      showSubtopicFollowUps(lastStep.data);
    } else if (lastStep.type === NAV_TYPES.FOLLOW_UPS) {
      // Return to subtopic card listing
      setSelectedSubtopic(null);
      const mainTopicObj = knowledgeBase.find((t) => t.mainTopic === selectedMainTopic);
      if (mainTopicObj) {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "subtopicCard",
            description: mainTopicObj.description || "",
            subtopics: mainTopicObj.subtopics.map((s) => s.subtopic),
            typed: true,
          },
        ]);
      }
    } else if (lastStep.type === NAV_TYPES.SUBTOPICS) {
      setSelectedMainTopic(null);
      setSelectedSubtopic(null);
      addMainTopics();
    }
  };

  // Helper to re-show follow-ups for a subtopic
  function showSubtopicFollowUps(subtopicName) {
    const mainTopicObj = knowledgeBase.find((t) => t.mainTopic === selectedMainTopic);
    if (!mainTopicObj) return;

    const stObj = mainTopicObj.subtopics.find((s) => s.subtopic === subtopicName);
    if (stObj && stObj.followUpOptions?.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "followUpOptions",
          followUpOptions: stObj.followUpOptions,
          typed: true,
        },
      ]);
    }
  }

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
                  // Topic list
                  if (msg.type === "topicList") {
                    return (
                      <ChatMessage key={msg.id} type="bot">
                        <CardContainer>
                          <CardButtonsWrapper>
                            {msg.topics.map((topic) => (
                              <CardButton
                                key={topic}
                                onClick={() => handleMainTopicClick(topic)}
                              >
                                {topic}
                              </CardButton>
                            ))}
                          </CardButtonsWrapper>
                        </CardContainer>
                      </ChatMessage>
                    );
                  }

                  // Subtopic card
                  if (msg.type === "subtopicCard") {
                    return (
                      <ChatMessage key={msg.id} type="bot">
                        <CardContainer>
                          <CardDescription>{msg.description}</CardDescription>
                          <CardButtonsWrapper>
                            {msg.subtopics.map((sub) => (
                              <CardButton
                                key={sub}
                                onClick={() => handleSubtopicClick(sub)}
                              >
                                {sub}
                              </CardButton>
                            ))}
                          </CardButtonsWrapper>
                        </CardContainer>
                      </ChatMessage>
                    );
                  }

                  // Follow-up options
                  if (msg.type === "followUpOptions") {
                    return (
                      <ChatMessage key={msg.id} type="bot">
                        <CardContainer>
                          <CardDescription>Learn More:</CardDescription>
                          <CardButtonsWrapper>
                            {msg.followUpOptions.map((option) => (
                              <CardButton
                                key={option.label}
                                onClick={() => handleFollowUpClick(option.target)}
                              >
                                {option.label}
                              </CardButton>
                            ))}
                          </CardButtonsWrapper>
                        </CardContainer>
                      </ChatMessage>
                    );
                  }

                  // Otherwise normal text
                  return (
                    <ChatMessage key={msg.id} type={msg.type}>
                      <ChatBubbleContent
                        content={msg.content}
                        type={msg.type}
                        typed={msg.typed}
                        onTypeProgress={() => {}}
                        onTypeDone={() => handleTypewriterDone(msg)}
                      />
                    </ChatMessage>
                  );
                })}

                {isBotTyping && (
                  <LoaderWrapper>
                    <Spinner />
                  </LoaderWrapper>
                )}

                {navigationStack.length > 0 && (
                  <BackButton onClick={handleBackClick}>
                    <FiArrowLeft size={18} /> Back
                  </BackButton>
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
