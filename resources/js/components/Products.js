import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SelectedProduct from './SelectedProduct';
import ShoppingCart from './ShoppingCart';

class Products extends Component {

    constructor(){
        super();
        this.state = {
            allProducts: [],
            currentProduct: [],
            shoppingCart: [],
            showProduct: false,
            showCart: false,
        };

        let _isMounted = false;
        this.addToCart = this.addToCart.bind(this);
        this.showCart = this.showCart.bind(this);
        this.addqty = this.addqty.bind(this);
        this.minusqty = this.minusqty.bind(this);
        this.checkOut = this.checkOut.bind(this);
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

    showCart(){
        this.setState({
            showCart: !this.state.showCart,
        });
    }

    addqty(product){
        this.state.shoppingCart.forEach(item =>{
            if(item.name === product.name){
                item.qty = parseInt(item.qty) + 1;
                this.setState({
                    shoppingCart: this.state.shoppingCart
                });
            }
        });
    }

    minusqty(product){
        this.state.shoppingCart.forEach(item =>{
            if(item.name === product.name){
                item.qty = parseInt(item.qty) - 1;
                this.setState({
                    shoppingCart: this.state.shoppingCart
                });
            }
        });
    }

    checkOut(){
        this.state.shoppingCart.forEach(item =>{
            axios.post('/checkout', {
                product: item.name,
                quantity: item.qty
            })
            .then(response => {
                this.setState({
                    allProducts: response.data,
                    });
            })
        this.setState({showCart: !this.state.showCart})
        });
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

                        <div className="col-2">
                            {this.state.showProduct ?  
                                <button className="cart" onClick={() => this.showCart()}><i className="fas fa-shopping-cart"></i></button>
                                : null  
                            }
                        </div>
                    </div>
                </div>

                {this.state.showCart ?  
                    <ShoppingCart    
                        cartItems = {this.state.shoppingCart}
                        closePopup = {this.showCart}
                        add = {this.addqty}
                        minus = {this.minusqty}
                        checkOut = {this.checkOut}
                    />  
                    : null  
                }
            </div>
        );
    }
}

export default Products;

if (document.getElementById('products')) {
    ReactDOM.render(<Products />, document.getElementById('products'));
}
