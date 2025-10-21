import { render, screen, within } from "@testing-library/react";
import DrugTable from "./DrugTable";
import { vi } from "vitest";

const mockDrugs = [
  {
    _id: "1",
    code: "0006-0568",
    genericName: "vorinostat",
    brandName: "ZOLINZA",
    company: "Merck Sharp & Dohme Corp.",
    launchDate: "2004-02-14T23:01:10Z",
  },
  {
    _id: "2",
    code: "0015-0167",
    genericName: "atorvastatin",
    brandName: "LIPITOR",
    company: "Pfizer Inc.",
    launchDate: "2002-05-10T08:00:00Z",
  },
];

describe("DrugTable Component", () => {
  const handleChange = vi.fn(), columns = [
      { key: "id", label: "Id" },
      { key: "code", label: "Code" },
      { key: "name", label: "Name" },
      { key: "company", label: "Company" },
      { key: "launchDate", label: "Launch Date" }
    ];
  test("renders table headers correctly", () => {
    render(<DrugTable drugs={mockDrugs} onSelectCompany={handleChange} columns={columns} />);

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Launch Date")).toBeInTheDocument();
  });

  test("renders all drug rows", () => {
    render(<DrugTable drugs={mockDrugs} onSelectCompany={handleChange} columns={columns} />);

    const rows = screen.getAllByRole("row");
    // 1 header row + 2 data rows
    expect(rows.length).toBe(3);
  });

  test("renders correct drug info", () => {
    render(<DrugTable drugs={mockDrugs} onSelectCompany={handleChange} columns={columns} />);

    // Verify a specific drug
    const firstDrug = screen.getByText(/vorinostat/i).closest("tr");
    expect(within(firstDrug).getByText("0006-0568")).toBeInTheDocument();
    expect(within(firstDrug).getByText("Merck Sharp & Dohme Corp.")).toBeInTheDocument();
    expect(within(firstDrug).getByText(new Date("2004-02-14T23:01:10Z").toLocaleDateString())).toBeInTheDocument();
  });
});
