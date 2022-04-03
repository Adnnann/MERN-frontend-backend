
import DatePicker from 'react-date-picker'

const DateInput = ({selectedDate, changeHandler}) => {
  
        return (
          <div style={{marginTop:'10px', minHeight:'40px'}}>
            <DatePicker
            value={selectedDate}
            onChange={changeHandler}
            />
          </div>
        );
    
}

export default DateInput