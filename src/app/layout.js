import "./globals.css";

import Menu from "@/components/Menu";
import PageWrapper from "@/components/PageWrapper";
import Wrapper from "@/components/Wrapper";

export const metadata = {
  title: "Tema Indonesia",
  description: "test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <PageWrapper>
          <Menu />
          <Wrapper>{children}</Wrapper>
        </PageWrapper>
      </body>
    </html>
  );
}
