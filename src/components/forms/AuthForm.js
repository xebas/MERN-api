import React, { Component, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Globals from '../../Globals';

function AuthFormVal() {
    // url del backend
    const url = Globals.base_url;
    // validación
    const { register, handleSubmit, errors } = useForm();
    // mensajes de request del backend (react hook)
    const [resValMessage, setResValMessage] = useState('');
    const [valClassNameEmail, setValClassNameEmail] = useState('');
    const [valClassNamePass, setValClassNamePass] = useState('');
    // handleSubmit
    const onSubmit = dataForm => {
        // petición AJAX con axios para enviar los datos al backend
        axios.post(url + 'login', dataForm)
            .then(function (res) {
                setResValMessage(res.data.message);
                if (res.data.status === 'email_val_error') {
                    setValClassNameEmail('resValInput');
                }
                if (res.data.status === 'pass_val_error') {
                    setValClassNamePass('resValInput');
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };
    // handleChange  (resetea el color del input)
    function handleChange() {
        setValClassNameEmail('resResetValInput');
        setValClassNamePass('resResetValInput');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2><i>Login</i></h2>
            <input type='text' className={valClassNameEmail} name='email' placeholder='email' onChange={handleChange} ref={register({
                required: true,
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }
            })} />
            { errors.email && errors.email.type === 'required' && <p>Rellena el campo email</p>}
            { errors.email && errors.email.type === 'pattern' && <p>Introduce un email correcto</p>}
            <input type='password' className={valClassNamePass} name='pass' placeholder='contraseña' onChange={handleChange} ref={register({ required: true })} />
            { errors.pass && <p>Rellena el campo contraseña</p>}
            <button type='submit' className="button"><span>Entra </span></button>
            <h5>No estás registrado? <NavLink to='/registro'>Regístrate</NavLink></h5>
            <div className='resValMessage'>{resValMessage}</div>
        </form>
    );
}

class AuthForm extends Component {
    render() {
        return <AuthFormVal />;
    }
}

export default AuthForm;
