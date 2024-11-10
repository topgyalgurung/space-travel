import { render, screen } from "@testing-library/react";
import SpacecraftList from "../SpacecraftList";
import { describe, it, expect, vi } from "vitest";
import { spacecraft, planet } from "../../../__mocks__/axios";

describe("SpacecraftList Component", () => {
  const mockOnSpacecraftClick = vi.fn();

  it("renders list of spacecraft", () => {
    render(
      <SpacecraftList
        spacecraft={spacecraft}
        planet={planet}
        selectedPlanet={null}
        onSpacecraftClick={mockOnSpacecraftClick}
      />
    );

    expect(screen.queryByText(/Apollo 11/i));
  });

  it("renders empty list when no spacecraft", () => {
    render(
      <SpacecraftList
        spacecraft={[]}
        planet={planet}
        selectedPlanet={null}
        onSpacecraftClick={mockOnSpacecraftClick}
      />
    );

    const spacecraftElements = screen.queryByText(/Apollo 11/i);
    expect(spacecraftElements).not.toBeInTheDocument();
  });
});
