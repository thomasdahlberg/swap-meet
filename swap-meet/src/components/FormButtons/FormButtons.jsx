import React from 'react';
import styles from './FormButtons.module.css';

const FormButtons = (props) => {
  return (
    <div className={styles.container}>
      {props.submitFunction ? (
        <button
          className={styles.submit}
          onClick={props.submitFunction}
          id={props.submitId}
        >
          {props.submitTitle ? props.submitTitle : 'Submit'}
        </button>
      ) : null}
      {props.cancelFunction ? (
        <button
          className={styles.cancel}
          onClick={props.cancelFunction}
          id={props.cancelId}
        >
          {props.cancelTitle ? props.cancelTitle : 'Cancel'}
        </button>
      ) : null}
    </div>
  );
};

export default FormButtons;
