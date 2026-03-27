import { createTask } from "@/utils/queries/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useCreateTask(boardId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["board", boardId],
      });
      router.push(`/${boardId}`);
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        console.error("Error creating task: ", error.message);
    },
  });
}
