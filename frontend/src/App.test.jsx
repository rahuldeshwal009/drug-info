import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<App />);
  expect(screen.getByText(/Drug Information/i)).toBeInTheDocument();
});
