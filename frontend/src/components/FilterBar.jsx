import React from "react";
import { TextField, MenuItem } from "@mui/material";

const FilterBar = ({ companies, selectedCompany, onSelectCompany }) => (
  <TextField
    select
    label="Filter by Company"
    value={selectedCompany}
    onChange={(e) => onSelectCompany(e.target.value)}
    fullWidth
    sx={{ marginBottom: 2 }}
  >
    <MenuItem value="">All</MenuItem>
    {companies.map((c) => (
      <MenuItem key={c} value={c}>
        {c}
      </MenuItem>
    ))}
  </TextField>
);

export default FilterBar;
