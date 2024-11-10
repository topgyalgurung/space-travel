import { render, screen, fireEvent } from "@testing-library/react";
import PlanetCard from "../PlanetCard";
import { vi } from "vitest"; // Ensure you are using the correct testing framework mock
import { mockResponse } from "../../../__mocks__/axios"; // Import the mock response data
import styles from "../Planets.module.css";

describe("PlanetCard", () => {
  // Mock data for testing
  const mockPlanet = mockResponse.planets[2]; // Earth
  const mockSpacecraft = mockResponse.spacecrafts; // Apollo 11
  const mockSetSelectedPlanet = vi.fn(); // Mock function to track planet selection
  const mockOnSpacecraftClick = vi.fn(); // Mock function to track spacecraft click

  // Clear mocks before each test to avoid any state leakage between tests
  beforeEach(() => {
    mockSetSelectedPlanet.mockClear();
    mockOnSpacecraftClick.mockClear();
  });

  // Test 1: Renders planet information correctly
  it("renders planet information correctly", () => {
    render(
      <PlanetCard
        planet={mockPlanet}
        spacecraft={mockSpacecraft}
        selectedPlanet={null}
        setSelectedPlanet={mockSetSelectedPlanet}
        onSpacecraftClick={mockOnSpacecraftClick}
      />
    );

    expect(screen.getByText("Earth")).toBeInTheDocument();
    expect(screen.getByAltText("Earth")).toHaveAttribute(
      "src",
      "https://example.com/earth.jpg"
    );
    expect(screen.getByText(/Current population:/)).toBeInTheDocument();
  });

  // Test 2: Shows spacecraft located on the planet (Apollo 11 is on Earth)
  it("shows spacecraft located on the planet", () => {
    render(
      <PlanetCard
        planet={mockPlanet}
        spacecraft={mockSpacecraft}
        selectedPlanet={null}
        setSelectedPlanet={mockSetSelectedPlanet}
        onSpacecraftClick={mockOnSpacecraftClick}
      />
    );

    // Apollo 11 is located on Earth (id: 2)
    expect(screen.getByText("Apollo 11")).toBeInTheDocument();
  });

  // Test 3: Handles planet selection when clicked
  it("handles planet selection", () => {
    render(
      <PlanetCard
        planet={mockPlanet}
        spacecraft={mockSpacecraft}
        selectedPlanet={null}
        setSelectedPlanet={mockSetSelectedPlanet}
        onSpacecraftClick={mockOnSpacecraftClick}
      />
    );

    const planetContent = screen.getByText("Earth").closest("div");
    fireEvent.click(planetContent);

    // Ensure that clicking the planet triggers the setSelectedPlanet function
    expect(mockSetSelectedPlanet).toHaveBeenCalledWith(mockPlanet);
  });

  // Test 4: Shows selected state when planet is selected
  //   it("shows selected state when planet is selected", () => {
  //     render(
  //       <PlanetCard
  //         planet={mockPlanet}
  //         spacecraft={mockSpacecraft}
  //         selectedPlanet={mockPlanet} // Setting planet as selected
  //         setSelectedPlanet={mockSetSelectedPlanet}
  //         onSpacecraftClick={mockOnSpacecraftClick}
  //       />
  //     );

  //     const planetContent = screen.getByText("Earth").closest("div");
  //     // Check if planet has the 'planet--selected' class and red border color
  //     expect(planetContent).toHaveClass(styles["planet--selected"]);
  //     expect(planetContent).toHaveStyle({ borderColor: "red" });
  //   });
});
