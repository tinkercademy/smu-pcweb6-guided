import React, { Component } from 'react';

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };

    }

    renderItems(){
        return this.props.cartItems.map(item =>{
            return(
                <div className="d-flex" key={item.name}>
                    <h3>{item.name} X {item.qty}</h3>
                    <button className="chgqty" onClick={() => this.props.add(item)}>+</button>
                    <button className="chgqty" onClick={() => this.props.minus(item)}>-</button>
                </div>
            );
        })
    }

    render() {
        return (
            <div>
                <div className='popup'>  
                    <div className='popupinner pl-4 pt-3'>
                        <button className="closepopup" onClick={() => this.props.closePopup()}>X</button>
                        <div className="mt-3">
                            {this.renderItems() }
                        </div>
                        <button className="checkoutbtn" onClick={() => this.props.checkOut()}>Check Out</button>
                    </div>
                </div>
            </div>    
        );
    }
}

export default ShoppingCart;
