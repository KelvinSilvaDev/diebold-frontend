import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export function DatePickerComponent({ value, onChange, disabled }) {
  
  const [selectedDate,setSelectedDate] = useState(value ? new Date(value) : null)

  const handleDateChange = (date) => {
    
    const isoDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    onChange(isoDate);
  };

  useEffect(() => {
    
    setSelectedDate(value ? new Date(value) : null);
  }, [value]);

  return (
    
    <DatePicker
    selected={selectedDate}
    onChange={handleDateChange}
    dateFormat="dd/MM/yyyy"
    disabled={disabled}
    className="border rounded-md py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
    
  );
}
