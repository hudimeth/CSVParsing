import React from 'react';
import { Route, Routes } from 'react-router'
import Layout from './Components/Layout';
import Generate from './Pages/Generate';
import Home from './Pages/Home';
import Upload from './Pages/Upload';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/upload' element={<Upload />} />
                <Route exact path='/generate' element={<Generate />} />
            </Routes>
        </Layout>
    )
}

export default App;

