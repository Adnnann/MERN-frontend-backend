import * as React from 'react';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export default function FilterBooks({filter}) {
  
  
  return (
    <TextField 
    onChange={(e)=>filter(e)}
    InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        variant='standard'
    style={{borderStyle:'solid', borderWidth:'1px', marginTop:'10px',
    borderColor:'grey', borderRadius:'15px', paddingLeft:'5px'}}/>
  );
}