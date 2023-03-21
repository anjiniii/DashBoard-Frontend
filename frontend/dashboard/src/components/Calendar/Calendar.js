import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// import { UilSchedule } from "@iconscout/react-unicons";

const Calendar = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <div className="calendar-container">
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        locale={ko}
        placeholderText="기간 설정"
        onChange={(update) => {
          setDateRange(update);
        }}
      />
    </div>
  );
};

export default Calendar;
