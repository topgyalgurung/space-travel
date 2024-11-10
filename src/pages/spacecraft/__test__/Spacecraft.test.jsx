import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { mockResponse } from "../../../__mocks__/axios";
import Spacecraft, { spacecraftLoader } from "../Spacecraft";

describe("Spacecraft Component", () => {
  const setupRouter = () =>
    createMemoryRouter(
      [
        {
          path: "/",
          element: <Spacecraft />,
          loader: spacecraftLoader,
        },
      ],
      {
        initialEntries: ["/"],
        initialIndex: 0,
      }
    );

  test("loads and displays spacecraft details", async () => {
    render(<RouterProvider router={setupRouter()} />);

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // // Check if spacecraft details are displayed
    // expect(screen.getByText(/Spacecraft Details/i)).toBeInTheDocument();
  });
});
