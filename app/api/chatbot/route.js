const cache = new Map();
const CACHE_LIMIT = 100;

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ reply: "Please provide a message." }), { status: 400 });
    }

    // Check cache first
    if (cache.has(message)) {
      console.log("Cache hit for message:", message);
      return new Response(JSON.stringify({ reply: cache.get(message) }), { status: 200 });
    }

    // Prepare request for Pinecone API
    const body = JSON.stringify({
      messages: [{ role: "user", content: message }],
      stream: false, // Streaming can be toggled here if supported
      model: "gpt-4o",
      temperature: 0.3, // Lower temperature for faster and more deterministic answers
      top_p: 0.7, // Adjust top_p for more focused responses
    });

    const response = await fetch("https://prod-1-data.ke.pinecone.io/assistant/chat/mardi-assistant", {
      method: "POST",
      headers: {
        "Api-Key": process.env.PINECONE_API_KEY,
        "Content-Type": "application/json",
      },
      body,
    });

    // Handle non-200 responses from Pinecone
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error from Pinecone:", errorData);
      return new Response(
        JSON.stringify({ reply: "There was an error processing your request. Please try again later." }),
        { status: 500 }
      );
    }

    // Parse response from Pinecone
    const data = await response.json();
    const reply = data.message?.content || "I'm not sure. Could you clarify?";

    // Store reply in cache
    if (cache.size >= CACHE_LIMIT) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey); // Remove the oldest entry if cache limit is reached
    }
    cache.set(message, reply);

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ reply: "An unexpected error occurred." }), { status: 500 });
  }
}
