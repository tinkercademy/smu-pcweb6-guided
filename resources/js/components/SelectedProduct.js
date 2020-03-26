import React, { Component } from 'react';

class SelectedProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e){
        this.setState({
            product: {
                qty: e.target.value,
                name: this.props.product.name
            }
        });
    }

    handleSubmit(){
        $("input").val('');
        this.props.onAdd(this.state.product);
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-around mb-5">
                    <h1>{this.props.product.name}</h1>
                </div>
                
                <div className="d-flex justify-content-around mb-2">
                    <h2>Price: ${this.props.product.price}</h2>
                </div>
                <div className="d-flex justify-content-around mb-5">
                    <h2>Stock Left: {this.props.product.stock_count}</h2>
                </div>

                <div className="justify-content-center mx-5">
                    <p className="productdesc">{this.props.product.description}</p>
                </div>

                <div className="mt-5">
                    <p className="mb-2 font-weight-bold">How many do you want?</p>
                    <input type="number" onChange={this.handleInput}/>
                    <button onClick={this.handleSubmit} className="btn btn-primary">Add to shopping cart</button>
                </div>
            </div>    
        );
    }
}

export default SelectedProduct;
