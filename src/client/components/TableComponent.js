import '../index.css';
import React, { useState, useEffect } from 'react';
import { formatDateUtil, getDifferenceBetweenDates } from '../utils/utils';

export default function TableComponent(props) {
  
    const constructBody = (data) => {
        return data.map((currData, index) => {
          let expiryDate = "-";
          let daysTillExpiry = "-";
          let isURLExpired = "-";
          if (currData.isExpiryDateGiven) {
            expiryDate = formatDateUtil(new Date(currData.expiryDate), "-");
            daysTillExpiry = getDifferenceBetweenDates(new Date(), new Date(currData.expiryDate)) + " days";
          }
          isURLExpired = daysTillExpiry > 0
          const spanClass = isURLExpired ? "Expired" : "Active";
            return (
              <tr key={index}>
                <td>{currData.fullURL}</td>
                <td><a href={currData.shortenedURL} target="_blank">{currData.shortenedURL}</a></td>
                <td>{expiryDate}</td>
                <td>{daysTillExpiry}</td>
                <td>
                  <span className={spanClass.toLocaleLowerCase()}>{spanClass}</span>
                </td>
                <td>{currData.isLoggingEnabled ? currData.hitsCount : "-"}</td>
              </tr>
            );
        })
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Expiry Date</th>
            <th>Days till expiry</th>
            <th>URL state</th>
            <th>Hits count</th>
          </tr>
        </thead>
        <tbody>
        {constructBody(props.tableData)}
        </tbody>
      </table>
    );
}