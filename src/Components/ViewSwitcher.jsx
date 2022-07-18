import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const ViewSwitcher = ({ value, onChange }) => {
  return (
    <FormControl>
      <FormLabel>Вид</FormLabel>
      <RadioGroup value={value} onChange={onChange}>
        <FormControlLabel value="card" control={<Radio />} label="Карточки" />
        <FormControlLabel value="list" control={<Radio />} label="Список" />
      </RadioGroup>
    </FormControl>
  );
};

export default ViewSwitcher;
