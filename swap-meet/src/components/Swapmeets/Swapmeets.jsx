import React from 'react';
import inventoryService from '../../utils/inventoryService';



const Swapmeets = (props) => {


// props.swapmeets.forEach((element) => {
//     wantItems.push(inventoryService.showOne(element.wantItem));
// })
// console.log(wantItems);


    return (
        <main>
            {props.swapmeets? 
                props.swapmeets.map(({_id, dateTime, transaction, }) => (
                <section key={_id}>
                    <h1>{_id}</h1>
                    <h2>{dateTime}</h2>
                    <p>{transaction.wantItem}</p>
                    <p>{transaction.offerItem}</p>
                </section>
                ))
                :
                <div>No Active Swap Meets</div>
                }
        </main>
    )
}


export default Swapmeets;
