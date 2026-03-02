import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getBoardById } from "@/utils/queries/boards";
import BoardLayout from "./BoardLayout";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const resolvedParams = await params;
  const boardId = resolvedParams.boardId;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["board", boardId], // Usamos el ID en la llave
    queryFn: () => getBoardById(boardId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardLayout boardId={boardId} />
    </HydrationBoundary>
  );
}
