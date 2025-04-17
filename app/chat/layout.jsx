// app/chat/layout.jsx
export default function ChatLayout({ children }) {
    return (
      <>
        {/* Force the HTML/body of this iframe‐page to be see‑through */}
        <style jsx global>{`
          html, body, #__next {
            background: transparent !important;
          }
        `}</style>
        {children}
      </>
    )
  }
  