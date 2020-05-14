import React from 'react';
import inventoryService from '../../utils/inventoryService';



const Swapmeets = (props) => {

    return (
        <main>
            {props.swapmeets? 
                props.swapmeets.map(({site, offerItem, wantItem, }) => (
                <section>
                    <h1>{site}</h1>
                    <h2>date</h2>
                    <p>{offerItem}</p>
                    <p>{wantItem}</p>
                </section>
                ))
                :
                <div>No Active Swap Meets</div>
                }
        </main>
    )
}


export default Swapmeets;
