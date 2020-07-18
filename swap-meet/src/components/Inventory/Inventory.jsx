import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Inventory.module.css';


class Inventory extends Component {
    constructor(props){
        super(props)
        this.state = {};
    }
    
    delayRedirect = e => {
        e.preventDefault();
        setTimeout(()=> {
            this.props.history.push('/inventory/edit')
            }, 1000)
    }
    render() {
        return (
            <main className={styles.mainContainer}>
                {
                    this.props.myItems.map(({name, _id, description, image, itemType, swapPref}) => (
                    <section className={styles.section} key={_id}>
                        <div className={styles.container}>
                            <img src={image} alt={name}/>                    
                            <div className={styles.info}>
                                <h1>{name}</h1>
                                <h3><em>{itemType}</em></h3>
                                <p>{description}</p>
                                <div>
                                    <button onClick={this.props.handleItemEditView} key={_id} id={_id}><Link to="" onClick={this.delayRedirect} className={styles.edit} key={_id} id={_id}>Edit</Link></button>
                                    <button id={_id} onClick={this.props.handleItemDelete} className={styles.delete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    ))
                    }
            </main>
        )
    }
}


export default withRouter(Inventory);
