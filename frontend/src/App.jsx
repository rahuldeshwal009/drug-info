import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import FilterBar from "./components/FilterBar";
import DrugTable from "./components/DrugTable";
import { API_BASE } from "./config";

const App = () => {
  const [columns, setColumns] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const fetchData = async () => {
    try {
      const [config, drugs, companies ] = await Promise.allSettled([
        fetch(`${API_BASE}config`).then((res) => res.json()),
        fetch(`${API_BASE}drugs`).then((res) => res.json()),
        fetch(`${API_BASE}companies`).then((res) => res.json())
      ]);

      console.log({ config, drugs, companies });

      if (config.status === "fulfilled") {
        setColumns(config.value.columns);
      }

      if (drugs.status === "fulfilled") {
        setDrugs(drugs.value);
      }

      if (companies.status === "fulfilled") {
        setCompanies(companies.value);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDrugs = selectedCompany
    ? drugs.filter((d) => d.company === selectedCompany)
    : drugs;

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        💊 Drug Information
      </Typography>
      <FilterBar
        companies={companies}
        selectedCompany={selectedCompany}
        onSelectCompany={setSelectedCompany}
      />
      <DrugTable drugs={filteredDrugs} columns={columns} onSelectCompany={setSelectedCompany} />
    </Container>
  );
};

export default App;
