// Tests needed:
// 1. checkbox should be unchecked when theme is light
// 2. checkbox should be checked when theme is dark
// 3. useTheme("dark") should be called when theme is light
// Following AAA pattern (Arrange Act Asert)

import { fireEvent, render, screen } from "@testing-library/react";
import { useTheme } from "next-themes";
import { describe, expect, it, vi } from "vitest";
import ThemeSwitch from "./ThemeSwitch";
import { beforeEach } from "node:test";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeSwitch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("checkbox should be unchecked when theme is 'light'", () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      themes: ["light", "dark"],
      setTheme: vi.fn(),
    });

    render(<ThemeSwitch />);

    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("checkbox should be checked when theme is 'dark'", () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: "dark",
      themes: ["light", "dark"],
      setTheme: vi.fn(),
    });

    render(<ThemeSwitch />);

    const checkbox = screen.getByRole("switch");
    expect(checkbox).toBeChecked();
  });

  it("useTheme(dark) should be called when theme is 'light'", () => {
    const setThemeMock = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      themes: ["light", "dark"],
      setTheme: setThemeMock,
    });

    render(<ThemeSwitch />);

    const checkbox = screen.getByRole("switch");
    fireEvent.click(checkbox);

    expect(setThemeMock).toBeCalledWith("dark");
  });
});
