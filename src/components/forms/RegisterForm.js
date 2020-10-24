// useState: https://es.reactjs.org/docs/hooks-state.html (Hook de estado)
import React, { Component, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Globals from '../../Globals';

function RegFormVal() {
    // url del backend
    const url = Globals.base_url;
    // validación
    const { register, handleSubmit, watch, errors } = useForm();
    // mensajes de request del backend
    const [resValMessage, setResValMessage] = useState('');
    const [valClassName, setValClassName] = useState('');
    // handleSubmit
    const onSubmit = dataForm => {
        // petición AJAX con axios para enviar los datos al backend
        axios.post(url + 'register', dataForm)
            .then(function (res) {
                setResValMessage(res.data.message);
                if (res.data.status === 'email_val_error') {
                    setValClassName('resValInput');
                }
                if (res.data.status === 'register_success') {
                    // return <Redirect to='/login' />;
                    // history.push('/login') ;
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };
    // handleChange  (resetea el color del input)
    function handleChange() {
        setValClassName('resResetValInput');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2><i>Registro</i></h2>
            <input type='text' name='nick' placeholder='nick' ref={register({ required: true })} />
            { errors.nick && <p>Rellena el campo nick</p>}
            <input type='text' className={valClassName} name='email' placeholder='email' onChange={handleChange} ref={register({
                required: true,
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }
            })} />
            { errors.email && errors.email.type === 'required' && <p>Rellena el campo email</p>}
            { errors.email && errors.email.type === 'pattern' && <p>Introduce un email correcto</p>}
            <input type='password' name='pass' placeholder='contraseña (6 caract. mín)' ref={register({
                required: true,
                minLength: 6
            })} />
            { errors.pass && errors.pass.type === 'required' && <p>Rellena el campo contraseña</p>}
            { errors.pass && errors.pass.type === 'minLength' && <p>La contraseña tiene menos de 6 caracteres</p>}
            <input type='password' name='pass2' placeholder='repetir contraseña' ref={register({
                required: true,
                validate: (value) => value === watch('pass')
            })} />
            { errors.pass2 && errors.pass2.type === 'required' && <p>Rellena el campo repetir contraseña</p>}
            { errors.pass2 && errors.pass2.type === 'validate' && <p>Las contraseñas no coindicen</p>}
            { /* <input type='file' className='custom-file-input' /> */}
            <button type='submit' className="button"><span>Registrarse </span></button>
            <h5>Ya tienes cuenta? <NavLink to='/login'>Entra</NavLink></h5>
            <div className='resValMessage'>{resValMessage}</div>
        </form>
    );
}

class RegisterForm extends Component {
    render() {
        return <RegFormVal />;
    }
}

export default RegisterForm;
