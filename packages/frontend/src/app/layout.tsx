import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloProvider } from "./providers/ApolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Earthquake App",
  description: "Manage a list of earthquakes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
