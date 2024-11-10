import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../tests/test-utils";

import Home from "../Home";

describe("Home Component", () => {
  test("renders main title", () => {
    renderWithProviders(<Home />);

    expect(
      screen.getByText("Space Travel: Expanding Horizons Beyond Earth")
    ).toBeInTheDocument();
  });

  test("renders all sections", () => {
    renderWithProviders(<Home />);

    const expectedSections = [
      "🌌 Journey into the Future",
      "🌍 From Neglect to Innovation",
      "🚀 Enter Space Travel: Where Dreams Take Flight",
      "🛠️ Engineer, Explorer, Leader",
      "🌠 A Universe of Possibilities Awaits",
    ];

    expectedSections.forEach((section) => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });

  test("renders section content", () => {
    renderWithProviders(<Home />);

    expect(
      screen.getByText(/In a world where the impossible has become reality/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Once the cradle of civilization/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Embark on an extraordinary journey/)
    ).toBeInTheDocument();
  });

  test("includes footer", () => {
    renderWithProviders(<Home />);

    expect(
      screen.getByText("The solar system: the new home.")
    ).toBeInTheDocument();
  });
});
