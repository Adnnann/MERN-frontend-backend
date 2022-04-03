import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

const SelectField = ({handleChange, selectedValues, object, objectIndex, disabled}) => {
    
    return(
        <Select fullWidth 
                        onChange={handleChange}
                        value={selectedValues}
                        disabled={disabled}
                        style={{
                            minWidth:"0px",
                            marginTop:'10px',
                            borderStyle:'solid',
                            borderColor:'grey',
                            borderWidth:'1px'
                        }}>
                       
                            
                            {Object.keys(object).length !== 0 ?
                            //exclude assigned authors from selection list
                            Object.values(object)
                            .map((item, index)=>{ 
                                return( 
                                <MenuItem 
                               
                                    key={index}
                                    value={item[objectIndex]}>
                                    {item[objectIndex]}
                                </MenuItem>
                                )
                            })
                           
                            : ''
                            } 
                                
                        </Select>
    )
}

export default SelectField