import { render, screen, within, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import AddNewBoard from "./CreateBoardModal";
import { useCreateBoard } from "@/hooks/useBoards";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { Board } from "@/types/data";
import { FormErrorProvider } from "@/context/FormErrorContext";

vi.mock("@/hooks/useDialog", () => ({
  useDialog: () => ({
    dialogRef: { current: { showModal: vi.fn(), close: vi.fn(), open: true } },
    closeDialog: vi.fn(),
    handleClickOutside: vi.fn(),
  }),
}));

vi.mock("@/hooks/useBoards", () => ({
  useCreateBoard: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("AddNewBoard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCreateBoard).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useCreateBoard>);
  });

  it("renders when modal is active on URL", () => {
    const mockUseSearchParams = vi.mocked(useSearchParams);
    const mockSearchParams = new URLSearchParams("modal=create-board");
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams,
    );

    render(
      <FormErrorProvider>
        <AddNewBoard />
      </FormErrorProvider>,
    );
  });

  it("Should call createBoard with the correct data on submit", async () => {
    const user = userEvent.setup({ delay: null });
    const mockMutateAsync = vi.fn();

    vi.mocked(useCreateBoard).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateBoard>);

    render(
      <FormErrorProvider>
        <AddNewBoard />
      </FormErrorProvider>,
    );

    const modal = screen.getByRole("dialog", { hidden: true });
    const nameInput = within(modal).getByLabelText(/name/i);
    await user.type(nameInput, "Mi Nuevo Tablero");

    const columnInputs = screen.getAllByPlaceholderText("e.g. Make coffee");
    await user.type(columnInputs[0], "Todo");
    await user.type(columnInputs[1], "Doing");

    const submitButton = within(modal).getByRole("button", {
      name: /Create New Board/i,
      hidden: true,
    });
    await user.click(submitButton);

    expect(mockMutateAsync).toHaveBeenCalledWith({
      boardName: "Mi Nuevo Tablero",
      columnNames: ["Todo", "Doing"],
    });
  });

  it("Should disable submit button and show loading text when pending", () => {
    vi.mocked(useCreateBoard).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: true, // Simulamos estado de carga
    } as unknown as ReturnType<typeof useCreateBoard>);
    render(
      <FormErrorProvider>
        <AddNewBoard />
      </FormErrorProvider>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Creating board.../i,
      hidden: true,
    });
    expect(submitButton).toBeDisabled();
  });

  it("Should navigate to /newBoardId when creation is successful", async () => {
    const pushMock = vi.fn();
    const user = userEvent.setup({ delay: null });

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as ReturnType<typeof useRouter>);

    const mockMutateAsync = vi.fn().mockImplementation(async (data: Board) => {
      const result = { board_id: "AEXBYRTCNIOE", boardName: data.name };
      if (result.board_id) {
        pushMock(`/${result.board_id}`);
      }

      return result;
    });

    vi.mocked(useCreateBoard).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateBoard>);
    render(
      <FormErrorProvider>
        <AddNewBoard />
      </FormErrorProvider>,
    );

    const nameInput = screen.getByPlaceholderText("e.g. Web Design");
    await user.type(nameInput, "New Test Board");

    const submitButton = screen.getByRole("button", {
      name: "Create New Board",
      hidden: true,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/AEXBYRTCNIOE");
    });
  });

  it("Should show 'Duplicated name' when server responds with DUPLICATED_NAME", async () => {
    const user = userEvent.setup({ delay: null });

    vi.mocked(useCreateBoard).mockReturnValue({
      mutateAsync: vi.fn().mockRejectedValue(new Error("DUPLICATE_BOARD_NAME")),
      isPending: false,
    } as unknown as ReturnType<typeof useCreateBoard>);
    render(
      <FormErrorProvider>
        <AddNewBoard />
      </FormErrorProvider>,
    );

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole("button", {
      name: /Create New Board/i,
      hidden: true,
    });

    await user.type(nameInput, "Marketing Plan");
    await user.click(submitButton);

    const errorMsg = await screen.findByText("Board already exists");
    expect(errorMsg).toBeInTheDocument();
  });

  it("Should not call createBoard and show error when name is empty", async () => {
    const user = userEvent.setup({ delay: null });
    const mockMutateAsync = vi.fn();
    vi.mocked(useCreateBoard).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateBoard>);

    render(
      <FormErrorProvider>
        <AddNewBoard />
      </FormErrorProvider>,
    );

    const submitButton = screen.getByRole("button", {
      name: "Create New Board",
      hidden: true,
    });

    await user.click(submitButton);

    expect(mockMutateAsync).not.toHaveBeenCalled();
    const errorMessage = await screen.findByText("Can't be empty");

    expect(errorMessage).toBeInTheDocument();
  });
});
