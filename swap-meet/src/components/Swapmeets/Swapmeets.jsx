import React from 'react';
// import inventoryService from '../../utils/inventoryService';



const Swapmeets = (props) => {
//     let swapMeetItemArray = []
//     for(let i = 1; i < props.swapmeets.length; i++){
//          let arr = props.items.filter(function(element) {
//             return element._id === props.swapmeets[i].transaction.offerItem
//             });
//         swapMeetItemArray.push(arr);
//     }
//     for(let i = 1; i < props.swapmeets.length; i++){
//         let arr = props.items.filter(function(element) {
//            return element._id === props.swapmeets[i].transaction.wantItem
//            });
//        swapMeetItemArray.push(arr);
//    }
//    console.log(swapMeetItemArray);
// props.swapmeets.map(({_id, dateTime, transaction, }) => (
//     console.log(inventoryService.showOne(transaction.wantItem).name)
//     ))

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
