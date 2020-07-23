import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './ViewSwapSite.module.css'

class ViewSwapSitePage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div>
                {this.props.showSite ? 
                    <main className={styles.outer}>
                        <div className={styles.header}>
                            <h1>{this.props.showSite.siteName}</h1>
                            <h2><em>{this.props.showSite.address}</em></h2>
                        </div>
                        <div className={styles.container}>
                            {this.props.items.map(({_id, name, description, itemType, swapPref, image}) => {
                                return(
                                    <div>
                                    {this.props.showSite.items.map(item => {
                                        if(item === _id){
                                            return (
                                                <div className={styles.item}>
                                                    <div className={styles.inner}>
                                                        <img src={image} alt={name}/>
                                                        <div className={styles.info}>
                                                            <h1>{name}</h1>
                                                            <h3><em>{itemType}</em></h3>
                                                            <p>{description}</p>
                                                            <h3>Looking for: <em>{swapPref}</em></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                null
                                            )
                                        }
                                    })}
                                    </div>
                                )

                            })
                            }
                        </div>
                    </main>
                    :
                    <Redirect to="/swapsites" />
                }
            </div>
        )
    }
}

export default ViewSwapSitePage