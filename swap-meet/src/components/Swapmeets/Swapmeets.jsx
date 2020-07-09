import React from 'react';
// import inventoryService from '../../utils/inventoryService';



const Swapmeets = (props) => {

    return (
        <main>
            {props.swapmeets? 
                props.swapmeets.map(({site, offerItem, wantItem, _id}) => (
                <section key={_id}>
                    <h1 key={_id}>{site}</h1>
                    <h2 key={_id}>date</h2>
                    <p key={_id}>{offerItem}</p>
                    <p key={_id}>{wantItem}</p>
                </section>
                ))
                :
                <div>No Active Swap Meets</div>
                }
        </main>
    )
}


export default Swapmeets;
