import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const SortSwitcher = ({ value, onChange }) => {
  return (
    <FormControl>
      <FormLabel>Сортировка</FormLabel>
      <RadioGroup value={value} onChange={onChange}>
        <FormControlLabel value="date" control={<Radio />} label="По дате" />
        <FormControlLabel
          value="category"
          control={<Radio />}
          label="По категории"
        />
        <FormControlLabel
          value="name"
          control={<Radio />}
          label="По названию"
        />
        <FormControlLabel
          value="size"
          control={<Radio />}
          label="По размеру картинки"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SortSwitcher;
