// components/ChatBot/ChatBotUI.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiMessageSquare, FiX, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ChatBubbleContent from "./ChatBubbleContent";
import { v4 as uuidv4 } from "uuid";
import knowledgeBase from "../../data/knowledgeBase";
import { WindupChildren } from "windups"; // Ensure windups is imported
import ScrollToBottom from "react-scroll-to-bottom";

/* ---------------------------
   Styled Components
   --------------------------- */

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

const StyledScrollContainer = styled(ScrollToBottom)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px; /* Maintain padding */
  gap: 10px; /* Preserve spacing between messages */
  overflow-y: auto; /* Enable smooth scrolling */
  scrollbar-width: none; -ms-overflow-style: none;
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
  backdrop-filter: blur(10px); /* Optional for a blurred effect */
  background-clip: padding-box; /* Ensures transparency looks smooth */
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
  gap: 8px; /* Add spacing between buttons */
  padding-top: 10px; /* Add spacing from the description */
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
// BackButton Styled Component
const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align items to the start (left) */
  background-color: #e5703a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 12px; /* Added horizontal padding */
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s, transform 0.15s;
  width: 100%; /* Full width */
  text-align: left; /* Ensure text is left-aligned */

  &:hover {
    background-color: #d55d2f;
    transform: scale(1.02);
  }
  svg {
    margin-right: 8px; /* Space between icon and text */
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

/* ---------------------------
   Animation Variants
   --------------------------- */

const chatBoxVariants = {
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

const NAV_TYPES = {
  SUBTOPICS: "subtopics",
  FOLLOW_UPS: "followUps",
  FOLLOW_UP_RESPONSE: "followUpResponse",
};

/* ---------------------------
    MAIN CHAT COMPONENT
    --------------------------- */

export default function ChatBotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMainTopic, setSelectedMainTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null); // Track selected subtopic
  const [navigationStack, setNavigationStack] = useState([]); // Navigation history stack
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0); // Scroll position state

  // Initial greeting message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addGreeting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const addGreeting = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "bot",
        content: ["Hello! How can we assist you today? Choose a topic below:"],
        hasCallback: true, // Indicates callback after typing
        typed: false, // Initialize as not typed
      },
    ]);
  };

  const addMainTopics = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "topicList",
        topics: knowledgeBase.map((topic) => topic.mainTopic),
        typed: true, // Topics are static, no typewriter effect
      },
    ]);
  };

  const handleMainTopicClick = (mainTopic) => {
    console.log("Selected Main Topic:", mainTopic);

    setSelectedMainTopic(mainTopic);
    setSelectedSubtopic(null);

    // Reset the stack with a single subtopics entry
    setNavigationStack([{ type: NAV_TYPES.SUBTOPICS, data: mainTopic }]);

    console.log("Navigation Stack after Main Topic:", navigationStack);

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), type: "user", content: mainTopic },
    ]);

    setIsBotTyping(true);

    setTimeout(() => {
      const mainTopicObj = knowledgeBase.find(
        (topic) => topic.mainTopic === mainTopic
      );

      if (mainTopicObj) {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "subtopicCard",
            description: mainTopicObj.description,
            subtopics: mainTopicObj.subtopics.map((sub) => sub.subtopic),
            typed: true,
          },
        ]);
      }
      setIsBotTyping(false);
    }, 1500);
  };

  const handleSubtopicClick = (subtopic) => {
    console.log("Selected Subtopic:", subtopic);

    setSelectedSubtopic(subtopic);

    // Add 'followUps' entry to the stack while avoiding duplicates
    setNavigationStack((prev) => {
      const updatedStack = [
        ...prev.filter((entry) => entry.type !== NAV_TYPES.FOLLOW_UPS),
        { type: NAV_TYPES.FOLLOW_UPS, data: subtopic },
      ];
      console.log("Navigation Stack after Subtopic:", updatedStack);
      return updatedStack;
    });

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), type: "user", content: subtopic },
    ]);

    setIsBotTyping(true);

    setTimeout(() => {
      const mainTopicObj = knowledgeBase.find(
        (topic) => topic.mainTopic === selectedMainTopic
      );
      const subtopicObj = mainTopicObj
        ? mainTopicObj.subtopics.find((sub) => sub.subtopic === subtopic)
        : null;

      if (subtopicObj) {
        // Add the subtopic response to the chat
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: subtopicObj.response,
            hasCallback: true, // Ensure typing animation callback is triggered
            typed: false,
          },
        ]);

        // Do not add follow-up options here. It will be handled in `handleTypewriterDone`.
      }

      setIsBotTyping(false);
    }, 1500); // Adjust this delay if needed
  };

  const handleFollowUpClick = (target) => {
    console.log("Selected Follow-Up:", target);

    setIsBotTyping(true);

    // Add 'followUpResponse' entry to the stack
    setNavigationStack((prev) => {
      const updatedStack = [
        ...prev.filter((entry) => entry.type !== NAV_TYPES.FOLLOW_UP_RESPONSE),
        { type: NAV_TYPES.FOLLOW_UP_RESPONSE, data: target },
      ];
      console.log("Navigation Stack after Follow-Up:", updatedStack);
      return updatedStack;
    });

    // Add user selection to chat history
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), type: "user", content: target },
    ]);

    setTimeout(() => {
      // Locate the selected main topic
      const mainTopicObj = knowledgeBase.find(
        (topic) => topic.mainTopic === selectedMainTopic
      );

      if (!mainTopicObj) {
        console.error("Main topic not found:", selectedMainTopic);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: ["Sorry, no response found."],
            hasCallback: true,
            typed: false,
          },
        ]);
        setIsBotTyping(false);
        return;
      }

      // Locate the selected subtopic
      const subtopicObj = mainTopicObj.subtopics.find(
        (sub) => sub.subtopic === selectedSubtopic
      );

      if (!subtopicObj) {
        console.error("Subtopic not found:", selectedSubtopic);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: ["Sorry, no response found."],
            hasCallback: true,
            typed: false,
          },
        ]);
        setIsBotTyping(false);
        return;
      }

      // Locate the follow-up response
      const followUpObj = subtopicObj.followUpOptions.find(
        (opt) => opt.target === target
      );

      if (!followUpObj) {
        console.error("Follow-up target not found:", target);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: ["Sorry, no response found."],
            hasCallback: true,
            typed: false,
          },
        ]);
        setIsBotTyping(false);
        return;
      }

      // Generate the follow-up response
      const followUpSubtopic = mainTopicObj.subtopics.find(
        (sub) => sub.subtopic === followUpObj.target
      );

      if (followUpSubtopic && followUpSubtopic.response) {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: followUpSubtopic.response,
            hasCallback: true,
            typed: false,
          },
        ]);
      } else {
        console.error("Response for follow-up not found:", followUpObj.target);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content: ["Sorry, no response found."],
            hasCallback: true,
            typed: false,
          },
        ]);
      }

      setIsBotTyping(false);
    }, 1500);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    // Add user message to chat history
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), type: "user", content: text },
    ]);

    setIsBotTyping(true);

    try {
      // Example fetch to your API
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      const reply = data.reply || "There was an error. Please try again.";

      // Assuming the API returns an array of strings and elements similar to knowledgeBase
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: [reply], // Modify based on API response structure
          hasCallback: true, // Use for typewriter effect
          typed: false, // Trigger typing animation
        },
      ]);
    } catch (err) {
      console.error("Error calling /api/chatbot:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "bot",
          content: ["There was an error. Please try again."],
          hasCallback: true,
          typed: false,
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Toggle chat open/close and store scroll position when closing
  const toggleChat = () => {
   
    setIsOpen((prev) => !prev);
  };


  
  

  const scrollToBottomDuringTyping = () => {
    // No manual scrolling is needed; ScrollToBottom handles it automatically.
  };
  

  const handleTypewriterDone = (message) => {
    if (message.hasCallback) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id
            ? { ...msg, hasCallback: false, typed: true }
            : msg
        )
      );

      // If the greeting is done, display the main topics
      if (
        message.type === "bot" &&
        message.content.includes(
          "Hello! How can we assist you today? Choose a topic below:"
        )
      ) {
        addMainTopics();
      }

      // Render follow-up options only after the subtopic response finishes typing
      if (message.type === "bot") {
        const lastEntry = navigationStack[navigationStack.length - 1];

        if (lastEntry && lastEntry.type === NAV_TYPES.FOLLOW_UPS) {
          const currentSubtopic = lastEntry.data;

          // Find the subtopic object
          const mainTopicObj = knowledgeBase.find(
            (topic) => topic.mainTopic === selectedMainTopic
          );
          const subtopicObj = mainTopicObj
            ? mainTopicObj.subtopics.find(
                (sub) => sub.subtopic === currentSubtopic
              )
            : null;

          if (subtopicObj && subtopicObj.followUpOptions.length > 0) {
            setMessages((prev) => [
              ...prev,
              {
                id: uuidv4(),
                type: "followUpOptions",
                followUpOptions: subtopicObj.followUpOptions,
                typed: true, // Static content, no typewriter effect
              },
            ]);
          }
        }
      }
    }
  };

  const handleBackClick = () => {
    if (navigationStack.length === 0) {
      console.log("Navigation Stack is empty. No action taken.");
      return;
    }

    const newStack = [...navigationStack];
    const lastStep = newStack.pop(); // Remove the last navigation state
    setNavigationStack(newStack);

    console.log("Navigation Stack after Back:", newStack);

    if (lastStep.type === NAV_TYPES.FOLLOW_UP_RESPONSE) {
      // Go back to follow-ups
      setSelectedSubtopic(lastStep.data);

      const mainTopicObj = knowledgeBase.find(
        (topic) => topic.mainTopic === selectedMainTopic
      );
      const subtopicObj = mainTopicObj
        ? mainTopicObj.subtopics.find(
            (sub) => sub.subtopic === selectedSubtopic
          )
        : null;

      if (subtopicObj && subtopicObj.followUpOptions.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "followUpOptions",
            followUpOptions: subtopicObj.followUpOptions,
            typed: true,
          },
        ]);
      }
    } else if (lastStep.type === NAV_TYPES.FOLLOW_UPS) {
      // Go back to subtopics
      setSelectedSubtopic(null);

      const mainTopicObj = knowledgeBase.find(
        (topic) => topic.mainTopic === selectedMainTopic
      );

      if (mainTopicObj) {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "subtopicCard",
            description: mainTopicObj.description,
            subtopics: mainTopicObj.subtopics.map((sub) => sub.subtopic),
            typed: true,
          },
        ]);
      }
    } else if (lastStep.type === NAV_TYPES.SUBTOPICS) {
      // Go back to main topics
      setSelectedMainTopic(null);
      setSelectedSubtopic(null);
      addMainTopics();
    }
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
              {messages
                .filter((msg) => !msg.hidden)
                .map((msg) => {
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

                  if (msg.type === "subtopicCard") {
                    return (
                      <ChatMessage key={msg.id} type="bot">
                        <CardContainer>
                          <CardDescription>{msg.description}</CardDescription>
                          <CardButtonsWrapper>
                            {msg.subtopics.map((subtopic) => (
                              <CardButton
                                key={subtopic}
                                onClick={() => handleSubtopicClick(subtopic)}
                              >
                                {subtopic}
                              </CardButton>
                            ))}
                          </CardButtonsWrapper>
                        </CardContainer>
                      </ChatMessage>
                    );
                  }

                  if (msg.type === "subtopicResponse") {
                    return (
                      <ChatMessage key={msg.id} type="bot">
                        <CardContainer>
                          <CardDescription>Response:</CardDescription>
                          <CardButtonsWrapper>
                            {/* You can customize how the response is displayed */}
                            <div>{msg.content}</div>
                          </CardButtonsWrapper>
                        </CardContainer>
                      </ChatMessage>
                    );
                  }

                  if (msg.type === "followUpOptions") {
                    return (
                      <ChatMessage key={msg.id} type="bot">
                        <CardContainer>
                          <CardDescription>
                            Select a follow-up question:
                          </CardDescription>
                          <CardButtonsWrapper>
                            {msg.followUpOptions.map((option) => (
                              <CardButton
                                key={option.label}
                                onClick={() =>
                                  handleFollowUpClick(option.target)
                                }
                              >
                                {option.label}
                              </CardButton>
                            ))}
                          </CardButtonsWrapper>
                        </CardContainer>
                      </ChatMessage>
                    );
                  }

                  if (msg.type === "followUpResponse") {
                    return (
                      <ChatMessage key={msg.id} type="bot">
                        <CardContainer>
                          <CardDescription>Follow-Up Response:</CardDescription>
                          <CardButtonsWrapper>
                            {/* You can customize how the follow-up response is displayed */}
                            <div>{msg.content}</div>
                          </CardButtonsWrapper>
                        </CardContainer>
                      </ChatMessage>
                    );
                  }

                  return (
                    <ChatMessage key={msg.id} type={msg.type}>
                      <ChatBubbleContent
                        content={msg.content}
                        type={msg.type}
                        typed={msg.typed} // Pass the typed flag
                        onTypeProgress={scrollToBottomDuringTyping}
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
              {/* Conditionally render the BackButton */}
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
