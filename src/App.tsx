import "./styles.scss";
import { useEffect, useState } from "react";
/**
 * 1. Create a functional REACT component
 * 2. Render an HTML table that contains 3 columns (id, name and roles)
 * 3. Create an interface for data from source public/data.json
 * 4. Get the data from public/data.json using fetch API and resolve them by using async function
      - usage of the react-query library is optional
 * 4.1. Use useState hook to store data
 * 5. Render fetched data within the HTML Table
 * 5.1. Render each object in a new table row
 * 5.2. Render header cells generically by object keys
 * 5.3. Iterate through data and render content cells
 * 5.3.1. Roles cell displays given roles as strings, separated by commas
 * 6. Display the image (url: https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745 ) on the right side next to the table (using Flexbox).
 * 6.1. Table should fill 50% of the page horizontally.
 * 6.2. Image should be centered horizontally in the right 50% of the page.
 * 6.3. Image and the table should be centered vertically
 */

type RoleType = "Admin" | "Owner";

interface Role {
  id: number;
  role: RoleType;
}

interface RowProps {
  id: number;
  name: string;
  roles?: Role[];
}

const Table = () => {
  const [rows, setRows] = useState<Array<RowProps>>([]);
  const [columnNames, setColumnNames] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("data.json");
      const data = await response.json();
      const cols: Array<string> = [];
      data.forEach((row: RowProps) => {
        Object.keys(row).forEach((key) => {
          if (!cols.includes(key)) cols.push(key);
        });
      });
      setColumnNames(cols);
      setRows(data);
    })();
  }, []);

  return (
    <div className="container">
      <table>
        <tr>
          {columnNames.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
        <tbody>
          {rows.map((row: RowProps) => (
            <tr>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.roles?.map((role: Role) => role.role).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="image">
        <img
          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
          alt="roles"
        />
      </div>
    </div>
  );
};

export default Table;
