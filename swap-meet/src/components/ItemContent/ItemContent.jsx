import React from 'react';
import styles from './ItemContent.module.css';

const ItemContent = (props) => {
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
                            onClick={props.handleToggleEditItem}
                            key={props.id} 
                            id={props.id}
                        >
                            Edit
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

export default ItemContent