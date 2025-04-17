// public/chat-widget.js
(function () {
    // 1) create the iframe pointing at your /chat route
    const iframe = document.createElement("iframe");
    iframe.src = "https://chat-bot-gamma-tan.vercel.app/chat";
    Object.assign(iframe.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "400px",
      height: "600px",
      border: "none",
      zIndex: "999999",
    });
  
    // 2) append it to the body once the DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(iframe);
      });
    } else {
      document.body.appendChild(iframe);
    }
  })();
  