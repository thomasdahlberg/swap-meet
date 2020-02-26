import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Login.module.css';

const Login = (props) => {
    return(
        <main className={styles.main}>
            <LoginForm />
        </main>
    );
}

export default Login;