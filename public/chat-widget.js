;(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://chat-bot-gamma-tan.vercel.app/chat";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  // CLOSED size: bubble (60×60) + 20px margin around = 80×80
  iframe.style.width = "80px";
  iframe.style.height = "80px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";
  iframe.style.transition = "all 0.3s ease";

  function resizeIframe(open) {
    if (open) {
      // OPEN size: 400×600
      iframe.style.width = "400px";
      iframe.style.height = "600px";
    } else {
      iframe.style.width = "80px";
      iframe.style.height = "80px";
    }
  }

  window.addEventListener("message", (event) => {
    if (event.data?.type === "CHATBOT_SIZE") {
      // ignore any width/height in the message, just use our static open/closed sizes
      resizeIframe(event.data.open);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(iframe);
    });
  } else {
    document.body.appendChild(iframe);
  }
})();
