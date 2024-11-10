import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { mockResponse } from "../../../__mocks__/axios";

import SpacecraftCard from "../SpacecraftCard";

describe("SpacecraftCard Component", () => {
  const defaultProps = {
    craft: mockResponse.spacecrafts[0],
    planet: mockResponse.planets[2],
    selectedPlanet: null,
    onSpacecraftClick: vi.fn(),
  };

  it("renders spacecraft information", () => {
    render(
      <BrowserRouter>
        <SpacecraftCard {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Apollo 11")).toBeInTheDocument();
    expect(screen.getByText("Capacity: 10")).toBeInTheDocument();
    expect(screen.getByAltText("Apollo 11")).toHaveAttribute(
      "src",
      "https://example.com/apollo11.jpg"
    );
  });

  test("shows rocket emoji when no picture", () => {
    const propsWithoutPicture = {
      ...defaultProps,
      craft: { ...defaultProps.craft, pictureUrl: null },
    };

    render(
      <BrowserRouter>
        <SpacecraftCard {...propsWithoutPicture} />
      </BrowserRouter>
    );
    expect(screen.getByText("🚀")).toBeInTheDocument();
  });

  test("handles spacecraft selection", () => {
    const propsWithSelectedPlanet = {
      ...defaultProps,
      selectedPlanet: mockResponse.planets[1], // Venus
    };

    render(
      <BrowserRouter>
        <SpacecraftCard {...propsWithSelectedPlanet} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Apollo 11"));
    expect(defaultProps.onSpacecraftClick).toHaveBeenCalledWith(
      defaultProps.craft.id
    );
  });
});
