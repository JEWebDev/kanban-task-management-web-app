import { getAllBoards } from "@/utils/queries/boards";
import "./globals.css";
import MainContainer from "@/components/shared/MainContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Providers from "@/components/Providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["boards"],
    queryFn: getAllBoards,
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={``}>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <MainContainer>{children}</MainContainer>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
