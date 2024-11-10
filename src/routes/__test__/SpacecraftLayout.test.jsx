import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SpacecraftLayout from "../SpacecraftLayout";

describe("SpacecraftLayout Component", () => {
  test("renders outlet content", () => {
    render(
      <BrowserRouter>
        <SpacecraftLayout>
          <div data-testid="spacecraft-outlet">Spacecraft Content</div>
        </SpacecraftLayout>
      </BrowserRouter>
    );

    expect(screen.getByTestId("spacecraft-outlet")).toBeInTheDocument();
  });
});
