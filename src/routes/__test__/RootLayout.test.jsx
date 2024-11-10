import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import styles from "../RootLayout.module.css";

import RootLayout from "../RootLayout";

describe("RootLayout Component", () => {
  //test 1: renders navigation links
  test("renders navigation links", () => {
    render(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );

    expect(screen.getByText("🌎 Home")).toBeInTheDocument();
    expect(screen.getByText("🚀 SpaceCrafts")).toBeInTheDocument();
    expect(screen.getByText("🪐 Planets")).toBeInTheDocument();
  });

  //test 2: applies active class to current route
  test("applies active class to current route", () => {
    render(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );

    const homeLink = screen.getByText("🌎 Home").closest("a");
    expect(homeLink).toHaveClass(styles["nav__link--active"]);
  });

  //test 3: handles navigation
  test("handles navigation", () => {
    render(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("🚀 SpaceCrafts"));
    expect(window.location.pathname).toBe("/spacecrafts");
  });

  //test 4: renders outlet content
  test("renders outlet content", () => {
    render(
      <BrowserRouter>
        <RootLayout>
          <div data-testid="mock-outlet">Mock Content</div>
        </RootLayout>
      </BrowserRouter>
    );

    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});
