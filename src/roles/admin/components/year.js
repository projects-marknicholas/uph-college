import React, { useState } from "react";

const Year = ({ onSelect }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const semesters = ["1st", "2nd"];

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    onSelect(e.target.value, selectedSemester);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    onSelect(selectedYear, e.target.value);
  };

  return (
    <div className="year-semester-dropdown">
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select value={selectedSemester} onChange={handleSemesterChange}>
        {semesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Year;
