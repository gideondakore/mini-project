import React, { useState } from "react";
import "./Contacts.css";
import hostels from "../../pages/MapWorks/hostelMap/data/HostelsDetailData.json";
import NavBar from "../../components/NavBar/NavBar";

const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredHostels = hostels.filter((hostel) =>
    hostel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contacts--wrapper">
      <NavBar />
      <div className="contacts-container">
        <h2>Hostels Contact Information</h2>
        <div className="search-input--contacts_container">
          <input
            type="text"
            placeholder="Search by hostel name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input--contacts"
            list="hostel-available--contacts"
          />
        </div>
        <datalist id="hostel-available--contacts">
          {hostels.map((hostel, index) => (
            <option key={index} value={hostel.name}></option>
          ))}
        </datalist>
        <table>
          <thead>
            <tr>
              <th>Hostel Name</th>
              <th>Contact Information</th>
            </tr>
          </thead>
          <tbody>
            {filteredHostels.map((hostel, index) => (
              <tr key={index}>
                <td>{hostel.name}</td>
                <td>{hostel.formatted_phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
