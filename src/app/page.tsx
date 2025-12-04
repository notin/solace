"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Advocate } from "../app/interfaces/Advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  async function getAdvocates(){
    let response = await axios("/api/advocates");
    setAdvocates(response.data.data);
    setFilteredAdvocates(response.data.data);
  }

  useEffect( () : void => {
    console.log("fetching advocates...");
    getAdvocates();
  }, []);

  const onChange = (e: any) => {
    const searchTerm = e.target.value;

    // document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience === parseInt(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  const onClickSort = (field: keyof Advocate) => {
    const sorted = [...filteredAdvocates].sort((a, b) => {
      const aVal = a[field] ?? "";
      const bVal = b[field] ?? "";
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
    setFilteredAdvocates(sorted);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th onClick={() => onClickSort("firstName")}>First Name</th>
          <th onClick={() => onClickSort("lastName")}>Last Name</th>
          <th onClick={() => onClickSort("city")}>City</th>
          <th onClick={() => onClickSort("degree")}>Degree</th>
          <th onClick={() => onClickSort("specialties")}>Specialties</th>
          <th onClick={() => onClickSort("yearsOfExperience")}>Years of Experience</th>
          <th onClick={() => onClickSort("phoneNumber")}>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate :Advocate) => {
            return (
              <tr key ={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s: string) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
