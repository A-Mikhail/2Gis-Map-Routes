import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../NavBar/index';
import {
    WomenRun, HalfMarathon, AlmatyMarathon, AdminPanel,
} from '../Map/userMaps';

const Main = () => (
    <>
        <h1 className="title"> Инструкция </h1>
        <p>Переходите по ссылкам в меню, для интеракции с примерами.</p>
        <br />
        <p>Текст сбоку карт нагло скопирован в целях заполнения примера контентом и не имеет никакого предназначения кроме как спасти сайт от пустоты.</p>
        <br />
        <p>Маршруты карт не соответствуют реальным и были нарисованы только для того чтобы показать как может выглядеть финальный вариант, если маршруты будет составлять человек кто не путается в карте даже с картой перед глазами.</p>
        <br />
        <p>Хорошего утра, дня, вечера, ночи</p>

        <hr />

        <h1 className="title">Используемые технологии</h1>
        <ol>
            <li>2Gis - карта (API)</li>
            <li>Адаптированный под 2Gis - leaflet.pm</li>
            <li>Bulma - CSS фреймворк </li>
            <li>ReactJS - FrontEnd</li>
            <li>ReactRoute</li>
            <li>Webpack</li>
            <li>Babel</li>
            <li>Пара рук</li>
        </ol>

        <hr />
        <h1 className="title">Автор</h1>
        <h2 className="subtitle">Михаил Адаменко</h2>
    </>
);

export default class Body extends Component {
    render() {
        return (
            <section className="hero is-fullheight is-link is-bold">
                <NavBar />

                <div className="hero-body">
                    <div className="container">
                        <Route exact path='/' component={Main} />

                        <Route path='/WomenRun' component={WomenRun} />
                        <Route path='/HalfMarathon' component={HalfMarathon} />
                        <Route path='/AlmatyMarathon' component={AlmatyMarathon} />
                        <Route path='/AdminPanel' component={AdminPanel} />
                    </div>
                </div>
            </section>
        );
    }
}
