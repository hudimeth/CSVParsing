import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow'>
                    <div className='container'>
                        <Link className='navbar-brand' to='/'>CSV Parsing</Link>
                        <button className='navbar-toggler' type='button' data-toggle='collapse'
                            data-target='.navbar-collapse' aria-controls='navbarSupportedContent'
                            aria-expanded='false' aria-label='toggle-navigation'>
                                <span className='navbar-toggle-icon'></span>
                        </button>
                        <div className='navbar-collapse collapse d-sm-imline-flex justify-content-between'>
                            <ul className='navbar-nav flex-grow-1'>
                                <li className='nav-item'><Link to='/upload' className='nav-link text-light'>Upload</Link></li>
                                <li className='nav-item'><Link to='/generate' className='nav-link text-light'>Generate</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className='container' style={{ marginTop: 80 }}>
                {children }
            </div>
        </div>
    )
}

export default Layout;