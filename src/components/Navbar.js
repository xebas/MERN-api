import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

class Navbar extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><img src={logo} className='App-logo' alt='logo' /></li>
                    <li><NavLink to='/'>Inicio</NavLink> /</li>
                    <li><NavLink to='/registro'>Registrarse</NavLink> /</li>
                    <li><NavLink to='/contacto'>Contacto</NavLink></li>
                </ul>
            </nav>
        );

    }
}

export default Navbar;
