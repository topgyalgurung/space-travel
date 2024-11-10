import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { mockResponse } from "../../../__mocks__/axios";
import Planets, { planetsLoader } from "../Planets";

describe("Planets Component", () => {
  const setupRouter = () =>
    createMemoryRouter(
      [
        {
          path: "/",
          element: <Planets />,
          loader: planetsLoader,
        },
      ],
      {
        initialEntries: ["/"],
        initialIndex: 0,
      }
    );

  test("loads and displays planets with their spacecraft", async () => {
    render(<RouterProvider router={setupRouter()} />);

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });
  });
});
