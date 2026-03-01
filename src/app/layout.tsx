import { getAllBoards } from "@/utils/queries/boards";
import "./globals.css";
import MainContainer from "@/components/shared/MainContainer";
import Providers from "@/components/providers";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialBoards = await getAllBoards();
  console.log("Initial boards: ", initialBoards);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={``}>
        <Providers>
          <MainContainer initialBoards={initialBoards}>
            {children}
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
