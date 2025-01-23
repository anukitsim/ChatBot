export const metadata = {
  title: "MARDI HOLDING",
  description: "Construction and Development Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
