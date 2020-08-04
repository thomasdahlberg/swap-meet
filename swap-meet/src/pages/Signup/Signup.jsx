import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import styles from './Signup.module.css';

const Signup = (props) => {
    return(
        <main className={styles.main}>
            <SignupForm {...props}/>
        </main>
    );
}

export default Signup;