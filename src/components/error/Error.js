import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <section>
                <h2>Página no encontrada</h2>
                <p>La página a la que intentas acceder no existe en la web</p>
            </section>
        );
    }
}

export default Error;