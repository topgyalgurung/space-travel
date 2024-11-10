import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import mockAxios from "../src/__mocks__/axios";

// Get mock data directly from axios mock
const mockData =
  mockAxios.get.mock.results.length > 0
    ? mockAxios.get.mock.results[0].value
    : {};
export const { planets: mockPlanets, spacecrafts: mockSpacecraft } =
  mockData.data || {};

export function renderWithProviders(ui, { route = "/" } = {}) {
  window.history.pushState({}, "", route);
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}
