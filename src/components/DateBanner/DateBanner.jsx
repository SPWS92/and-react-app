import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../../context/AppContext";

const DateBanner = () => {
  const { selectedDate, setSelectedDate } = useAppContext();

  return (
    <div className="items-center font-bold p-2 bg-blue-600 flex flex-wrap">
      <div className="text-xl text-white">Showing results for:&nbsp;</div>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="MMM yyyy"
        maxDate={new Date("12-31-2020")}
        className="rounded pl-2"
        showMonthYearPicker
      />
    </div>
  );
};

export default DateBanner;
