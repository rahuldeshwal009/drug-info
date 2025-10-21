import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
  Button,
} from "@mui/material";

const DrugTable = ({ drugs, columns, onSelectCompany }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.key}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {drugs.map((drug) => (
          <TableRow key={drug._id}>
            <TableCell>{drug._id}</TableCell>
            <TableCell>{drug.code}</TableCell>
            <TableCell>{`${drug.genericName} (${drug.brandName})`}</TableCell>
            <TableCell>
              <Button size="small" sx={{ marginLeft: 1 }} 
              onClick={() => onSelectCompany(drug.company)}>
              {drug.company}
              </Button>
            </TableCell>
            <TableCell>{new Date(drug.launchDate).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DrugTable;
