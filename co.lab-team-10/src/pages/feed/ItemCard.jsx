import React from 'react'

export default function ItemCard() {
    return (
        // need to add link element to go to items detail page
        <div className='item-card'>
            <img src="https://cdn.cort.com/cort/images/products/P1105478_main_400.jpg" alt="chair" width={75} height={75} />
            <h3>title</h3>
            <h3>location</h3>
        </div>
    )
}
