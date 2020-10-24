import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './assets/css/App.css';
import './assets/css/Forms.css';
import './assets/css/Animations.css';
//import components
import Header from './components/Header';
import Footer from './components/Footer';
import HomeTitle from './components/home/HomeTitle';
import RegisterForm from './components/forms/RegisterForm';
import AuthForm from './components/forms/AuthForm';
import ContactForm from './components/forms/ContactForm';
import Error from './components/error/Error';

function App() {
    return (
        <div className='content'>
            {/* Router */}
            <BrowserRouter>
                <Header />
                <main>
                    {/* Configurar rutas y páginas */}
                    <Switch>
                        <Route exact path='/' component={HomeTitle} />
                        <Route exact path='/registro' component={RegisterForm} />
                        <Route exact path='/login' component={AuthForm} />
                        <Route exact path='/contacto' component={ContactForm} />
                        <Route exact component={Error} />
                    </Switch>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
