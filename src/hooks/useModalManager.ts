import { useSearchParams, useRouter } from "next/navigation";

export const useModalManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openModal = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", type);
    router.push(`?${params.toString()}`);
  };

  return { openModal };
};
