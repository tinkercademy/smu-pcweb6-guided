import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SelectedProduct from './SelectedProduct';

class Products extends Component {

    constructor(){
        super();
        this.state = {
            allProducts: [],
            currentProduct: [],
            shoppingCart: [],
            showProduct: false,
        };

        let _isMounted = false;
        this.addToCart = this.addToCart.bind(this);
    }
    
    componentDidMount(){
        this._isMounted = true;
        fetch('/productsALL')
            .then(response =>{
                return response.json();
            })
            .then(allProducts => {
                if(this._isMounted){
                    this.setState({allProducts: allProducts});
                }
            });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    showProduct(product){
        this.setState({
            currentProduct: product,
            showProduct: true
        },
            () => {
                console.log(this.state.currentProduct);
            });
    }

    addToCart(product){
        let productAlreadyInCart = false;
        this.state.shoppingCart.forEach(item =>{
            if(item.name === product.name){
                productAlreadyInCart = true;
                item.qty = parseInt(item.qty) + parseInt(product.qty);
            }
        });
        if(!productAlreadyInCart){
            this.setState({
                shoppingCart: [...this.state.shoppingCart, product],
                });
        }
    }

    renderProducts(){
        return this.state.allProducts.map(product => {
            return(
                <div className="mb-5" key={product.id}>
                    <button onClick={() => this.showProduct(product)} className="productbtn"><h2>{product.name}</h2></button>
                </div>
            );
        })
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                        <h1 className="mb-5">PRODUCTS</h1>
                            {this.renderProducts() }
                        </div>

                        <div className="col-7">
                            {this.state.showProduct ?  
                                <SelectedProduct
                                    product={this.state.currentProduct}
                                    onAdd={this.addToCart}
                                />
                                : null  
                            }
                        </div>

                        <div className="col-2"></div>
                    </div>
                </div>      
            </div>
        );
    }
}

export default Products;

if (document.getElementById('products')) {
    ReactDOM.render(<Products />, document.getElementById('products'));
}
