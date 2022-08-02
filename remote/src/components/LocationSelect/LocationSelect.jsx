import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const LocationSelect = ({location, setLocation, locations}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">City</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={location}
        label="City"
        onChange={e => setLocation(e.target.value)}
      >
        { locations?.map(l => (<MenuItem key={l.key} value={l.key}>{ l.value }</MenuItem>)) }
      </Select>
    </FormControl>
  );
}

export default LocationSelect;