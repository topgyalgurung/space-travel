import { render, screen } from "@testing-library/react";
import styles from "../Spinner.module.css";

// import { renderWithProviders } from "../../test-utils/test-utils";
import Spinner from "../Spinner";

describe("Spinner Component", () => {
  test("renders loading spinner", () => {
    render(<Spinner />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("has correct styling", () => {
    render(<Spinner />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass(styles.spinner);
  });
});
