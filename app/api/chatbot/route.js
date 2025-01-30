// app/api/chatbot/route.js

import { NextResponse } from 'next/server';

// Initialize a simple in-memory cache using Map
const cache = new Map();

// Define a maximum cache size to prevent memory overflow
const CACHE_LIMIT = 100; // Adjust as needed

// Function to add items to the cache with size management
function addToCache(key, value) {
  if (cache.size >= CACHE_LIMIT) {
    // Remove the first inserted key (FIFO) to maintain cache size
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, value);
}

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { reply: "Please provide a message." },
        { status: 400 }
      );
    }

    // Check if the message is in the cache
    if (cache.has(message)) {
      console.log("Cache hit for message:", message);
      const cachedReply = cache.get(message);
      return NextResponse.json(
        { reply: cachedReply },
        { status: 200 }
      );
    }

    // If not cached, call Pinecone Assistant API
    const response = await fetch(
      `https://prod-1-data.ke.pinecone.io/assistant/chat/${process.env.PINECONE_ASSISTANT_ID}`,
      {
        method: "POST",
        headers: {
          "Api-Key": process.env.PINECONE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: message }],
          stream: false,
          model: "gpt-4o", // Ensure this is the correct model identifier
          temperature: 0.3,
          top_p: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error from Pinecone:", errorData);
      return NextResponse.json(
        {
          reply:
            "There was an error processing your request. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Parse response from Pinecone
    const data = await response.json();
    const reply = data.message?.content || "I'm not sure. Could you clarify?";

    // Store the reply in the cache
    addToCache(message, reply);

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { reply: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
