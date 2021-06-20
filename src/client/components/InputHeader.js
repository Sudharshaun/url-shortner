import '../index.css';
import React, { useState } from 'react';
import { addOneYeartoCurrentDate } from '../utils/utils';
export default function InputHeader(props) {
    const [urlString, setUrlString] = useState("");
    const [isHitCountEnabled, setisHitCountEnabled] = useState(false);
    const [expiryDate, setexpiryDate] = useState("");
    const handleSubmit = (event) => {
        const expiryDateServed = expiryDate == "" ? addOneYeartoCurrentDate() : expiryDate;
        const isExpiryDateGiven = expiryDate == "" ? false : true;
        props.addURL(urlString, isHitCountEnabled, expiryDateServed, isExpiryDateGiven);
        setUrlString("");
        setisHitCountEnabled(false);
        setexpiryDate(new Date());
    }
    return (
        <div className="wrap">
            <input name="enter-url" value={urlString} type="text" onChange={ (event) => setUrlString(event.target.value)} placeholder="Enter URL to be shortened" className="username"/>
            <label htmlFor="isLoggingEnabled" className="count-hits">Count hits</label>
            <input type="checkbox" className="checkbox" checked={isHitCountEnabled} id="isLoggingEnabled" onChange={(event) => setisHitCountEnabled(event.target.checked)}></input>
            <input type="date" value={expiryDate} className="date" onChange={(event) => setexpiryDate(event.target.value)}></input>
            <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
        </div>
    )
}