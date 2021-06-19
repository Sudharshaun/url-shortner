import '../index.css';
import React, { useState } from 'react';

export default function TableComponent(props) {
    const tableSource = props.tableData;
    const constructBody = () => {
        return tableSource.map((currData, index) => {
            return (
              <tr key={index}>
                <td>{currData.fullURL}</td>
                <td>{currData.shortenedURL}</td>
                <td>{new Date(currData.expiryDate) + ""}</td>
                <td>Alive</td>
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