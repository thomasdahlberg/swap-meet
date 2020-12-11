import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './InventoryItem.module.css';

const InventoryItem = (props) => {
    return (
        <section className={styles.section} key={props.id}>
            <div className={styles.container}>
                <img src={props.image} alt={props.name}/>                    
                <div className={styles.info}>
                    <h1>{props.name}</h1>
                    <h3><em>{props.itemType}</em></h3>
                    <p>{props.description}</p>
                    <div>
                        <button 
                            onClick={props.handleItemEditView}
                            key={props.id} 
                            id={props.id}
                        >
                            <Link 
                                to="/inventory/edit" 
                                className={styles.edit} 
                                key={props.id} 
                                id={props.id}
                            >
                                Edit
                            </Link>
                        </button>
                        <button 
                            id={props.id} 
                            onClick={props.handleItemDelete}
                            className={styles.delete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(InventoryItem)