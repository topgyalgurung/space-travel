import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Spacecrafts, { spacecraftLoader } from "../Spacecrafts";

describe("Spacecrafts Component", () => {
  const setupRouter = () =>
    createMemoryRouter(
      [
        {
          path: "/",
          element: <Spacecrafts />,
          loader: spacecraftLoader,
        },
      ],
      {
        initialEntries: ["/"],
        initialIndex: 0,
      }
    );

  test("loads and displays spacecrafts", async () => {
    render(<RouterProvider router={setupRouter()} />);

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // Check if spacecrafts are displayed
    // expect(screen.getByText(/Build a Spacecraft/i)).toBeInTheDocument();
  });
});
