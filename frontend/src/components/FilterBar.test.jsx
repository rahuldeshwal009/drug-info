import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "./FilterBar";

describe("FilterBar Component", () => {
  const companies = ["Pfizer", "Merck", "Bayer"];

  test("renders dropdown with all options", () => {
    render(
      <FilterBar
        companies={companies}
        selectedCompany=""
        onChange={() => {}}
      />
    );

    // Check the dropdown exists
    const select = screen.getByLabelText("Filter by Company");
    expect(select).toBeInTheDocument();

    fireEvent.mouseDown(select);

    companies.forEach((company) => {
      expect(screen.getByText(company)).toBeInTheDocument();
    });
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  test("renders selected company correctly", () => {
    render(
      <FilterBar
        companies={companies}
        selectedCompany="Merck"
        onChange={() => {}}
      />
    );

    const select = screen.getByLabelText("Filter by Company");
    expect(select).toHaveTextContent("Merck");
  });
});
