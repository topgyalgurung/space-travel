import { render, screen } from "@testing-library/react";
import styles from "../Footer.module.css";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("renders footer text", () => {
    render(<Footer />);

    expect(
      screen.getByText("The solar system: the new home.")
    ).toBeInTheDocument();
  });

  test("displays emojis", () => {
    render(<Footer />);

    expect(screen.getByText("🌍 🚀 👩‍🚀 🪐")).toBeInTheDocument();
  });

  test("has correct styling", () => {
    render(<Footer />);

    const footer = screen
      .getByText("The solar system: the new home.")
      .closest("div");
    expect(footer).toHaveClass(styles.footer);
  });
});
