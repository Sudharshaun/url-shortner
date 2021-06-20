import React, { useEffect, useState } from 'react';
import './index.css';
import InputHeader from './components/InputHeader';
import TableComponent from './components/TableComponent';
import axios from 'axios';

export default function App() {
  const [allURLData, setallURLData] = useState([])
  const shortenURL = (url, canLogHits, expiryDate) => {
    axios({
      url: "/api/shorturl",
      method: "post",
      data: {
        longUrl: url,
        isLoggingEnabled: canLogHits,
        expiryDate: expiryDate
      }
    }).then( (response) => {

      console.log(response.data);
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
      console.log(response.data);
    })
  }, [])
  console.log(allURLData);
  return (
    <React.StrictMode>
      <div className="container">
        <InputHeader addURL={shortenURL} />
        {allURLData.length > 0 ? <TableComponent tableData={allURLData} /> : ""}
      </div>
    </React.StrictMode>
  );
}
