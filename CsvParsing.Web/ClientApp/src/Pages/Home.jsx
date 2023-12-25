import React, { useState, useEffect } from 'react';
import PersonRow from '../Components/PersonRow';
import axios from 'axios';

const Home = () => {

    const [people, setPeople] = useState(null);

    useEffect(() => {
        const loadPeople = async () => {
            const { data } = await axios.get('/api/csvparsing/getall');
            setPeople(data);
        }
        loadPeople();
    }, [])

    const onDeleteAllClicked = async () => {
        await axios.post('/api/csvparsing/deleteall');
        setPeople([]);
    }

    if (!people) {
        return (
            <div className='container pt-5'>
                <div className='row offset-md-6'>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className='row offset-md-5'>
                    <h3>Loading People....</h3>
                </div>
            </div>
            )
    }

    return (
        <div className='container pt-3'>
            <div className='row col-md-4 offset-md-4'>
                <button className='btn btn-danger' onClick={onDeleteAllClicked}>Delete All</button>
            </div>
            <table className='table table-dark table-striped table-bordered mt-5'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(p => <PersonRow key={p.id} person={p }/>)}
                </tbody>
            </table>
        </div>
        )
}

export default Home;