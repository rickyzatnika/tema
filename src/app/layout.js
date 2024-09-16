import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

import Menu from "@/components/Menu";
import Wrapper from "@/components/Wrapper";
import { CursorProvider } from "@/context/CursorContext";

export const metadata = {
  title: "Tema Indonesia",
  description: "test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <CursorProvider>
          <Menu />
          <CustomCursor />
          <Wrapper>{children}</Wrapper>
        </CursorProvider>
      </body>
    </html>
  );
}
