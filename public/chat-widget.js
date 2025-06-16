/*  chat-widget.js  ──────────────────────────────────────────────
   • Injects an iframe that hosts /chat (built by Next/Vercel)
   • Listens for CHATBOT_SIZE messages so the iframe grows / shrinks
   • Starts collapsed (60×60 bubble) – expands to full chatBox w/h
----------------------------------------------------------------*/
(function () {
  /* 1. create the iframe only once */
  const iframe = document.createElement('iframe');
  iframe.id = 'mardi-chatbot-frame';
  Object.assign(iframe.style, {
    position: 'fixed',
    bottom: '24px',
    right:  '24px',
    width:  '60px',
    height: '60px',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 4px 6px rgba(0,0,0,.15)',
    zIndex:  999999,              /* above everything */
    overflow: 'visible',          /* so rounded bubble isn’t clipped */
  });

  /* 2. point iframe to the standalone chat page that renders ChatBotUI */
  iframe.src = 'https://chat-bot-gamma-tan.vercel.app/chat';  /* or /chat/page route */

  document.body.appendChild(iframe);

  /* 3. listen for size messages sent by ChatBotUI */
  window.addEventListener('message', (e) => {
    if (!e.data || e.data.type !== 'CHATBOT_SIZE') return;

    const { open, width, height } = e.data;

    /* collapsed → little bubble   |  open → chat box size */
    iframe.style.width  = (open ? width  : 60) + 'px';
    iframe.style.height = (open ? height : 60) + 'px';

    /* rounded corners only for the bubble */
    iframe.style.borderRadius = open ? '12px' : '50%';
  });
})();
