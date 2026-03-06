import { fireEvent, render, screen, within } from "@testing-library/react";
import Dropdown from "./Dropdown";
import { describe, expect, it, vi } from "vitest";

window.HTMLElement.prototype.scrollIntoView = vi.fn();
const mockColumns = [
  { column_id: "col-0", name: "To Do", tasks: [] },
  { column_id: "col-1", name: "Doing", tasks: [] },
  { column_id: "col-2", name: "Done", tasks: [] },
];

describe("ColumnSelector Dropdown", () => {
  it("should change the id of index 0 by default if there is no interaction", () => {
    render(<Dropdown columns={mockColumns} name={"columnId"} />);

    const hiddenInput = screen.getByTestId("column-id-input");
    expect((hiddenInput as HTMLInputElement).value).toBe("col-0");
  });
  it("should update the id when user selects a different option", () => {
    render(<Dropdown columns={mockColumns} name={"columnId"} />);

    const button = screen.getByRole("openDropdown");
    fireEvent.click(button);

    const option = screen.getByText("Doing");
    fireEvent.click(option);

    const hiddenInput = screen.getByTestId("column-id-input");
    expect(hiddenInput).toHaveValue("col-1");
  });

  it("should alternate the isOpen state when the button is clicked", () => {
    render(<Dropdown columns={mockColumns} name="columnId" />);

    const button = screen.getByRole("openDropdown");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should open with ArrowDown key and close with Tab key", () => {
    render(<Dropdown columns={mockColumns} name="columnId" />);

    const container =
      screen.getByRole("openDropdown").parentElement?.parentElement;

    fireEvent.keyDown(container!, { key: "ArrowDown" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(container!, { key: "Tab" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should focus the first option (index 0) when opening dropdown", () => {
    render(<Dropdown columns={mockColumns} name="columnId" />);

    const container =
      screen.getByRole("openDropdown").parentElement?.parentElement;

    fireEvent.keyDown(container!, { key: "ArrowDown" });

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    const firstOption = within(listbox).getByRole("option", { name: /To Do/i });
    expect(firstOption).toHaveFocus();
  });

  it("should focus the second option (index 1) when pressing the arrowDown key again", () => {
    render(<Dropdown columns={mockColumns} name="columnId" />);

    const container =
      screen.getByRole("openDropdown").parentElement?.parentElement;

    fireEvent.keyDown(container!, { key: "ArrowDown" });
    fireEvent.keyDown(container!, { key: "ArrowDown" });

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    const secondOption = within(listbox).getByRole("option", {
      name: /Doing/i,
    });
    expect(secondOption).toHaveFocus();
  });
});
