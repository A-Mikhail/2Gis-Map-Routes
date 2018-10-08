import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export class NavBar extends Component {
    componentDidMount() {
        let burger = document.querySelector('.navbar-burger');
        let nav = document.querySelector('#' + burger.dataset.target);

        burger.addEventListener('click', function () {
            burger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
        });
    }

    render() {
        return (
            // Desktop navbar
            <div className="hero-head">
                <nav className="navbar">
                    <span role="button" className="navbar-burger burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>

                    <div id="navMenu" className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="https://a-mikhail.github.io/2Gis-Map-Routes/" key="main" className="navbar-item"> Главная страница </Link>
                            <Link to='/WomenRun' key='WomenRun' className="navbar-item"> Женский забег </Link>
                            <Link to='/HalfMarathon' key='HalfMarathon' className="navbar-item"> Алматинский Полумарафон </Link>
                            <Link to='/AlmatyMarathon' key='AlmatyMarathon' className="navbar-item"> Алматы марафон 2019 </Link>
                            <Link to='/AdminPanel' key='adminPanel' className="navbar-item"> Админ. панель </Link>
                        </div>
                    </div>

                    {/* Mobile NavBar */}
                    <div className="navbar-menu is-active">
                    </div>
                </nav>
            </div>
        )
    }
}
