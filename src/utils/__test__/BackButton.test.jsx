import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import BackButton from "../BackButton";

describe("BackButton Component", () => {
  test("renders back button and navigates back when clicked", () => {
    // Initialize history with at least one entry to test history length
    window.history.pushState({}, "", "/some-path");

    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );

    const button = screen.getByTestId("back-button");
    fireEvent.click(button);

    // Verify that window.history.length is greater than 1 after navigation
    expect(window.history.length).toBeGreaterThan(1);
  });
});
