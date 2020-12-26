import React from 'react';
import FormButtons from '../FormButtons/FormButtons';
import styles from './ItemContent.module.css';

const ItemContent = (props) => {
  return (
    <section className={styles.section} key={props.id}>
      <div className={styles.container}>
        <img src={props.image} alt={props.name} />
        <div className={styles.info}>
          <h1>{props.name}</h1>
          <h3>{props.itemType}</h3>
          <p>{props.description}</p>
          <FormButtons
            submitId={props.id}
            submitTitle="Delete"
            cancelId={props.id}
            cancelTitle="Edit"
            submitFunction={props.handleItemDelete}
            cancelFunction={props.handleToggleEditItem}
          />
        </div>
      </div>
    </section>
  );
};

export default ItemContent;
