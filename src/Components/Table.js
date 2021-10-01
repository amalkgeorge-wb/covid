import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function BasicTable(props) {
  let today = new Date();
  let date =
    today.getDate() +
    "-" +
    (today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1) +
    "-" +
    today.getFullYear();
  console.log(date);
  const classes = useStyles();
  const [selected, setSelected] = useState(null);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Covacine</TableCell>
            <TableCell>CoviShield</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                {row?.available_capacity
                  ? row?.sessions.map((item, i) => {
                      if (item.vaccine === "COVAXIN" && item.date === date)
                        return item.available_capacity;
                    })
                  : row.vaccine === "COVAXIN"
                  ? row.available_capacity
                  : "-"}
              </TableCell>
              <TableCell>
                {row?.sessions
                  ? row &&
                    row.sessions &&
                    row.sessions.map((item) => {
                      if (item.vaccine === "COVISHIELD" && item.date === date)
                        return item.available_capacity;
                    })
                  : row.vaccine === "COVISHIELD"
                  ? row.available_capacity
                  : "-"}
              </TableCell>
              <TableCell
                onClick={() => {
                  setSelected(row.center_id);
                  props.setSelectedItem(row);
                }}
              >
                {selected === row.center_id ? "selected" : "select"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
