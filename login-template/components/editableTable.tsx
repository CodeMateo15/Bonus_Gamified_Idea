'use client'
import React from 'react';

// Define the type for a table row
type TableRow = {
  name: string; // First column will hold strings
  [key: string]: string | number; // Other columns will be editable strings or numbers
};

// Add a number of days to a date
const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

// Format date as "MM/DD/YYYY"
const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

// Initialize data with custom names for each row
const initialData: TableRow[] = [
  { name: "Date", col1: 'date?', col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "Hours Worked Daily", col1: 8, col2: 8, col3: 8, col4: 8, col5: 8, col6: 8, col7: 8, col8: 8, col9: 8, col10: 8 },
  { name: "Hours Worked Sum", col1: 8, col2: 16, col3: 24, col4: 32, col5: 40, col6: 48, col7: 56, col8: 64, col9: 72, col10: 80 },
  { name: "Actual - Regulators Shipped Daily", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "Budget - Regulators Shipped Daily", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "Actual - Regulators Shipped Sum", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "Budget - Regulators Shipped Sum (estimated until final day)", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "Minimum Daily Needed for Bonus", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 }, // might be able to delete
  { name: "Number of Regulators Need to Ship to Get Min Bonus", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "% Bonus Earned for Pay Period", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "1st Shift Hourly Rate (Sub-Assy)", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "2nd Shift Hourly Rate (Sub-Assy)", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "1st Shift Hourly Rate (Service Regulators)", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "2nd Shift Hourly Rate (Service Regulators)", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  { name: "1st Shift Hourly Rate (Order Completion)", col1: 0, col2: 0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
  // Add more rows with custom names if needed
];

const EditableTable: React.FC = () => {
  // You can handle state initialization on the client-side using useEffect
  const [data, setData] = React.useState<TableRow[]>(initialData);

  // Handle changes in the input fields
  const handleChange = (
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    const newData = data.map((row, index) => {
      if (index === rowIndex) {
        if (columnId === 'col1') {
          // If changing col1, update col1 and calculate subsequent dates for col2 to col10
          const startDate = new Date(value);
          const newDate = new Date(startDate);
          return {
            ...row,
            [columnId]: value,
            col2: formatDate(addDays(newDate, 1)),
            col3: formatDate(addDays(newDate, 2)),
            col4: formatDate(addDays(newDate, 3)),
            col5: formatDate(addDays(newDate, 4)),
            col6: formatDate(addDays(newDate, 7)),
            col7: formatDate(addDays(newDate, 8)),
            col8: formatDate(addDays(newDate, 9)),
            col9: formatDate(addDays(newDate, 10)),
            col10: formatDate(addDays(newDate, 11))
          };
        } else {
          // Otherwise, update the value of the current column only
          return { ...row, [columnId]: value };
        }
      }
      return row;
    });
    setData(newData); // Update state with new data
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border border-gray-300 px-4 py-2">{row.name}</td>
            {Array.from({ length: 10 }, (_, colIndex) => (
              <td key={colIndex} className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row[`col${colIndex + 1}`]}
                  onChange={(e) =>
                    handleChange(
                      rowIndex,
                      `col${colIndex + 1}`,
                      e.target.value
                    )
                  }
                  className="w-full px-2 py-1"
                  style={{ width: '110%' }} // Set width to 110% of the cell width
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
