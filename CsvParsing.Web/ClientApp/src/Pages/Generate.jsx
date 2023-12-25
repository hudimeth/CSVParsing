import React, { useState } from 'react';
import axios from 'axios';

const Generate = () => {

    const [amount, setAmount] = useState('');

    const onTextChange = e => {
        setAmount(e.target.value)
    }
    
    const onGenerateClick = async () => {
        window.location.href = `/api/csvparsing/generatepeoplecsv/${amount}`;
    }

    return (
        <div className='container'>
            <div className='row col-md-6 offset-md-3'>
                <h1>Generate Random People:</h1>
            </div>
            <div className='row mt-5'>
                <div className='col-md-6 offset-md-2'>
                    <input value={amount} onChange={onTextChange} placeholder='Amount' className='form-control' />
                </div>
                <div className='col-md-3'>
                    <button className='btn btn-warning' onClick={onGenerateClick}>Generate</button>
                </div>
            </div>
        </div>
        )
} 

export default Generate;