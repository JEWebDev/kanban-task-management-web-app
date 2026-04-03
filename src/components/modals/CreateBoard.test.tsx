import { render, screen, within, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  ReadonlyURLSearchParams,
  useParams,
  useSearchParams,
} from "next/navigation";
import AddNewBoard from "./CreateBoardModal";
import { useBoard, useCreateBoard, useUpdateBoard } from "@/hooks/useBoards";
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
  useBoard: vi.fn(),
  useCreateBoard: vi.fn(),
  useUpdateBoard: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("AddNewBoard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useParams).mockReturnValue({} as ReturnType<typeof useParams>);
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams(
        "modal=create-board",
      ) as unknown as ReadonlyURLSearchParams,
    );
    vi.mocked(useBoard).mockReturnValue({
      data: undefined,
    } as unknown as ReturnType<typeof useBoard>);
    vi.mocked(useCreateBoard).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useCreateBoard>);
    vi.mocked(useUpdateBoard).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useUpdateBoard>);
  });

  it("renders when modal is active on URL", () => {
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
    const nameInput = within(modal).getByLabelText("Name");
    await user.type(nameInput, "Mi Nuevo Tablero");

    const columnInputs = screen.getAllByPlaceholderText("e.g. Todo");
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
      isPending: true,
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

  it("Should show 'Board already exists' when server responds with DUPLICATED_NAME", async () => {
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

    const nameInput = screen.getByLabelText("Name");
    const submitButton = screen.getByRole("button", {
      name: /Create New Board/i,
      hidden: true,
    });

    await user.type(nameInput, "Marketing Plan");
    await user.click(submitButton);

    const error = await screen.findByText(/Board already exists/i);
    expect(error).toBeInTheDocument();
  });

  it("Should call updateBoard with the correct data on edit submit", async () => {
    const user = userEvent.setup({ delay: null });
    const mockUpdateAsync = vi.fn();

    vi.mocked(useParams).mockReturnValue({
      boardId: "board-123",
    } as ReturnType<typeof useParams>);
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams(
        "modal=edit-board",
      ) as unknown as ReadonlyURLSearchParams,
    );
    vi.mocked(useBoard).mockReturnValue({
      data: {
        board_id: "board-123",
        name: "Platform Roadmap",
        columns: [
          { column_id: "col-1", name: "Todo", tasks: [] },
          { column_id: "col-2", name: "Doing", tasks: [] },
        ],
      },
    } as unknown as ReturnType<typeof useBoard>);
    vi.mocked(useUpdateBoard).mockReturnValue({
      mutateAsync: mockUpdateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useUpdateBoard>);

    render(
      <FormErrorProvider>
        <AddNewBoard />
      </FormErrorProvider>,
    );

    const nameInput = screen.getByDisplayValue("Platform Roadmap");
    await user.clear(nameInput);
    await user.type(nameInput, "Platform Delivery");

    const submitButton = screen.getByRole("button", {
      name: /Save Changes/i,
      hidden: true,
    });
    await user.click(submitButton);

    expect(mockUpdateAsync).toHaveBeenCalledWith({
      boardId: "board-123",
      boardName: "Platform Delivery",
      columns: [
        { id: "col-1", name: "Todo" },
        { id: "col-2", name: "Doing" },
      ],
    });
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

  it("should not call updateBoard and should show error if no changes are made in edit mode", async () => {
    const user = userEvent.setup({ delay: null });
    const mockUpdateAsync = vi.fn();
    vi.mocked(useUpdateBoard).mockReturnValue({
      mutateAsync: mockUpdateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useUpdateBoard>);

    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === "modal" ? "edit-board" : null),
    } as unknown as ReadonlyURLSearchParams);

    vi.mocked(useBoard).mockReturnValue({
      data: {
        board_id: "board-123",
        name: "Platform Roadmap",
        columns: [{ column_id: "col-1", name: "Todo", tasks: [] }],
      },
    } as unknown as ReturnType<typeof useBoard>);

    render(
      <FormErrorProvider>
        <AddNewBoard />
      </FormErrorProvider>,
    );

    const saveButton = screen.getByRole("button", {
      name: /Save Changes/i,
      hidden: true,
    });
    await user.click(saveButton);

    expect(mockUpdateAsync).not.toHaveBeenCalled();
    const errors = await screen.findAllByText(/No changes to save/i);
    expect(errors.length).toBeGreaterThan(0);
  });
});
