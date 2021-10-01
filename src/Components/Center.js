import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Table from "./Table";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Center(props) {
  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const classes = useStyles();
  const [stateArray, setStateArray] = useState([]);
  const [details, setDetails] = useState(["", null, null]);
  const [districtArray, setDistrictArray] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    getState();
  }, []);

  function getState() {
    axios
      .get("https://cdndemo-api.co-vin.in/api/v2/admin/location/states")
      .then((response) => setStateArray(response?.data?.states));
  }
  function getDistrict(url) {
    axios
      .get(url)
      .then((response) => setDistrictArray(response?.data?.districts));
  }
  const handleStateChange = (event) => {
    setDetails([event.target.value, null, null]);
    let url =
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" +
      event.target.value;
    getDistrict(url);
  };

  const handleDistrictChange = (event) => {
    setDetails([details[0], event.target.value, null]);
    let url =
      "calendarByDistrict?district_id=" +
      event.target.value +
      "&date="+date;
    getData(url);
  };
  function getData(params) {
    let url =
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/" + params;
    axios.get(url).then((response) => setData(response?.data?.centers));
  }
  function getPinData(params) {
    let url =
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/" + params;
    axios.get(url).then((response) => setData(response?.data?.sessions));
  }
  function handlePinChange(event) {
    setDetails([details[0], details[1], event.target.value]);
    let url = "findByPin?pincode=" + event.target.value + "&date="+date;
    getPinData(url);
  }

  return (
    <div className="center-selections">
      <h2 className="center-heading">Choose Vaccine Center</h2>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={details[0]}
          onChange={handleStateChange}
          label="State"
        >
          {stateArray.map((item) => (
            <MenuItem value={item.state_id}>{item.state_name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
        <Select
          disabled={districtArray.length > 0 ? false : true}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={details[1]}
          onChange={handleDistrictChange}
          label="District"
        >
          {districtArray.map((item) => (
            <MenuItem value={item.district_id}>{item.district_name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className="pincode"
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onBlur={handlePinChange}
      />

      <Table data={data} 
          setSelectedItem={props.setSelectedItem}
      />
    </div>
  );
}
export default Center;
