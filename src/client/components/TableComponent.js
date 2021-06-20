import '../index.css';
import React, { useState } from 'react';
import { formatDateUtil, getDifferenceBetweenDates } from '../utils/utils';

export default function TableComponent(props) {
    const tableSource = props.tableData;
    const constructBody = () => {
        return tableSource.map((currData, index) => {
          const expiryDate = formatDateUtil(new Date(currData.expiryDate), "-");
          const daysTillExpiry = getDifferenceBetweenDates(new Date(), new Date(currData.expiryDate)) + " days";
          const isURLExpired = daysTillExpiry > 0
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
                <td>{currData.hitsCount}</td>
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
        {constructBody()}
        </tbody>
      </table>
    );
}