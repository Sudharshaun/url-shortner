import React, { useEffect, useState } from 'react';
import './index.css';
import InputHeader from './components/InputHeader';
import TableComponent from './components/TableComponent';
import axios from 'axios';

export default function App() {
  const [allURLData, setallURLData] = useState([]);
  const shortenURL = (url, canLogHits, expiryDate, isExpiryDateGiven) => {
    axios({
      url: "/api/shorturl",
      method: "post",
      data: {
        longUrl: url,
        isLoggingEnabled: canLogHits,
        expiryDate: expiryDate,
        isExpiryDateGiven: isExpiryDateGiven,
      }
    }).then( (response) => {
      const updatedData = [...allURLData, response.data];
      setallURLData(updatedData);
    }).catch( (error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    axios({
      url: "/api/getAllUrls",
      method: "GET",
    }).then( (response) => {
      setallURLData(response.data);
    });
  }, []);

  return (
    <React.StrictMode>
      <div className="container">
        <InputHeader addURL={shortenURL} />
        {allURLData.length > 0 ? <TableComponent tableData={allURLData} /> : ""}
      </div>
    </React.StrictMode>
  );
}
