import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Autocomplete, TextField } from '@mui/material';

export default function DropDown({options , value , onChange ,label}) {
  const [age, setAge] = React.useState('');
  const defaultProps = {
    options: options,
    getOptionLabel: (option) => option.label,
  };
 

  return (
    // <Box sx={{ minWidth: 120 }}>
    //   <FormControl fullWidth>
    //     <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       value={value}
    //       label="label"
    //       onChange={handleChange}
    //     >
    //       {
    //         options?.map((option , index)=>{
    //            return <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
    //         })  
    //       }
          
    //     </Select>
    //   </FormControl>
    // </Box>

    <Autocomplete
    disablePortal
    {...defaultProps}
    id="controlled-demo"
    
    onChange={(event, newValue) => {
     debugger
      onChange(newValue.value);
    }}
    renderInput={(params) => (
      <TextField {...params} value={value} label={label} variant="standard" />
    )}
  />
  );
}