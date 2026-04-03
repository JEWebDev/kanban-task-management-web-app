import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useParams } from "next/navigation";
import { useCreateTask } from "@/hooks/useTasks";
import { useBoard } from "@/hooks/useBoards";
import userEvent from "@testing-library/user-event";
import { FormErrorProvider } from "@/context/FormErrorContext";
import CreateTaskModal from "./CreateTaskModal";
vi.mock("@/hooks/useDialog", () => ({
  useDialog: () => ({
    dialogRef: { current: { showModal: vi.fn(), close: vi.fn(), open: true } },
    closeDialog: vi.fn(),
    handleClickOutside: vi.fn(),
  }),
}));

vi.mock("@/hooks/useTasks", () => ({
  useCreateTask: vi.fn(),
}));

vi.mock("@/hooks/useBoards", () => ({
  useBoard: vi.fn(),
}));

// Mock de Navegación
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useParams: vi.fn(),
}));

describe("CreateTaskModal Component", () => {
  const mockBoardId = "board-123";
  const mockColumns = [
    { column_id: "col-1", name: "Todo" },
    { column_id: "col-2", name: "Doing" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useParams).mockReturnValue({ boardId: mockBoardId });

    vi.mocked(useBoard).mockReturnValue({
      data: { columns: mockColumns },
      isLoading: false,
    } as unknown as ReturnType<typeof useBoard>);

    vi.mocked(useCreateTask).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useCreateTask>);
  });

  it("Should render correctly with board columns in dropdown", () => {
    render(
      <FormErrorProvider>
        <CreateTaskModal />
      </FormErrorProvider>,
    );

    expect(screen.getByText(/Add New Task/i)).toBeInTheDocument();
    expect(screen.getByText("Todo")).toBeInTheDocument();
  });

  it("Should call createTask with correct data and subtasks", async () => {
    const user = userEvent.setup({ delay: null });
    const mockMutateAsync = vi.fn();

    vi.mocked(useCreateTask).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateTask>);

    render(
      <FormErrorProvider>
        <CreateTaskModal />
      </FormErrorProvider>,
    );

    await user.type(screen.getByLabelText(/Title/i), "New Test Task");
    await user.type(
      screen.getByLabelText(/Description/i),
      "This is a description",
    );

    const subtaskInputs = screen.getAllByPlaceholderText(/e.g. Make coffee/i);
    await user.type(subtaskInputs[0], "Subtask 1");
    await user.type(subtaskInputs[1], "Subtask 2");

    const submitButton = screen.getByRole("button", {
      name: "Create Task",
      hidden: true,
    });
    await user.click(submitButton);

    const call = mockMutateAsync.mock.calls[0][0];
    expect(call.title).toBe("New Test Task");
    expect(call.description).toBe("This is a description");
    expect(typeof call.columnId).toBe("string");
    expect(call.priorityId).toBe(1);
    expect(
      call.subtasks.filter((s: string) => !s.startsWith("new-") && s),
    ).toEqual(["Subtask 1", "Subtask 2"]);
  });

  it("Should show loading state on button when pending", () => {
    vi.mocked(useCreateTask).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: true,
    } as unknown as ReturnType<typeof useCreateTask>);

    render(
      <FormErrorProvider>
        <CreateTaskModal />
      </FormErrorProvider>,
    );

    const submitButton = screen.getByRole("button", {
      name: "Creating task...",
      hidden: true,
    });
    expect(submitButton).toBeDisabled();
  });

  it("Should not call createTask if title is empty and show Zod error", async () => {
    const user = userEvent.setup({ delay: null });
    const mockMutateAsync = vi.fn();

    vi.mocked(useCreateTask).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateTask>);

    render(
      <FormErrorProvider>
        <CreateTaskModal />
      </FormErrorProvider>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Create Task/i,
      hidden: true,
    });
    await user.click(submitButton);

    expect(mockMutateAsync).not.toHaveBeenCalled();
    const errorMsg = await screen.findByText(/Can't be empty/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it("Should handle server errors and show them in the UI", async () => {
    const user = userEvent.setup({ delay: null });

    vi.mocked(useCreateTask).mockReturnValue({
      mutateAsync: vi.fn().mockRejectedValue(new Error("Can't be empty")),
      isPending: false,
    } as unknown as ReturnType<typeof useCreateTask>);

    render(
      <FormErrorProvider>
        <CreateTaskModal />
      </FormErrorProvider>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Create Task/i,
      hidden: true,
    });
    await user.click(submitButton);

    const errorMsg = await screen.findByText(/Can't be empty/i);
    expect(errorMsg).toBeInTheDocument();
  });
});
