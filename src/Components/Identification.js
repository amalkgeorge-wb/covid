import { styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { useState } from "react";

function Identification(props) {
  const idProof = ["Adhar Id", "Student Id", "Passport", "Birth Certificate"];
  
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      <h2 className="ident-type">Select Identification Type</h2>
      <Box className="ident-Box" sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {idProof.map((item) => (
            <Grid
              onClick={() => props.setSelectedId(item)}
              style={{ backgroundColor: props.selectedId === item ? "blue" : null ,color: props.selectedId === item ? "white" : null  }}
              className="layout-id"
              item
              xs={4}
            >
              <item>{item}</item>
            </Grid>
          ))}
        </Grid>
      </Box>

      <form>

        <div className="id-number">{props.selectedId && "enter your Id" +props.selectedId}</div>
         <input
            className="input"
            type="number"
            name="name"
            value={props.idValue}
            onChange={(e)=>props.setIdValue(e.target.value)}
            placeholder="enter id"
          />
      </form>
    </div>
  );
}
export default Identification;
