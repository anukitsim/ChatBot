// public/chat-widget.js
;(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://chat-bot-gamma-tan.vercel.app/chat";
  iframe.style.position   = "fixed";
  iframe.style.bottom     = "20px";
  iframe.style.right      = "20px";
  iframe.style.width      = "100px";  // closed
  iframe.style.height     = "100px";
  iframe.style.border     = "none";
  iframe.style.zIndex     = "999999";
  iframe.style.transition = "width 0.3s ease, height 0.3s ease";

  function resizeIframe(open) {
    if (open) {
      iframe.style.width  = "400px";
      iframe.style.height = "600px";
    } else {
      iframe.style.width  = "100px";
      iframe.style.height = "100px";
    }
  }

  window.addEventListener("message", (e) => {
    if (e.data?.type === "CHATBOT_SIZE") {
      resizeIframe(e.data.open);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => document.body.appendChild(iframe));
  } else {
    document.body.appendChild(iframe);
  }
})();
