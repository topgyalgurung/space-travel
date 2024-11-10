import { render, screen, fireEvent } from "@testing-library/react";
import { act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import axios from "./__mocks__/axios";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("./__mocks__/axios");

describe("App Component", () => {
  beforeEach(() => {
    console.log("clearing mocks");
    vi.clearAllMocks();
  });

  test("render home page by default", () => {
    render(<App />);
    const homePage = screen.getByText("🌎 Home");
    expect(homePage).toBeInTheDocument();
  });

  test("renders other navigation links", async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText("🌎 Home")).toBeInTheDocument();
    expect(screen.getByText("🚀 SpaceCrafts")).toBeInTheDocument();
    expect(screen.getByText("🪐 Planets")).toBeInTheDocument();
  });

  test("handles navigation to different routes", async () => {
    await act(async () => {
      render(<App />);
    });
    await act(async () => {
      userEvent.click(screen.getByText(/spacecrafts/i));
    });
    await waitFor(() => {
      expect(screen.getByText(/spacecrafts/i)).toBeInTheDocument();
    });
  });

  test("handles api errors", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    const consoleSpy = vi.spyOn(console, "error");
    await act(async () => {
      render(<App />);
    });

    const spacecraftsLink = screen.getByText("🚀 SpaceCrafts");
    await act(async () => {
      fireEvent.click(spacecraftsLink);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
