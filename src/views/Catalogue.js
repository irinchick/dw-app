import React, { Component } from 'react';
import '../assets/styles/Catalogue.css';
import { observer } from 'mobx-react'
import catalogueStore from '../stores/catalogueStore'
import { Link } from "react-router-dom";

@observer
class Catalog extends Component {
    componentWillMount(){
        if(!catalogueStore.products.length){
            catalogueStore.load()
        }
    }
    render() {
        if (catalogueStore.loading)
            return <h1>Loading</h1>
            return (<div className="App">
                    <header>

                    </header>
                    <div className="catalogue">
                        {catalogueStore.products.map(product => <ProductItem key={product.id} product={product} /> )}
                    </div>
                </div>
            )
    }

}
export default Catalog;




@observer
class ProductItem extends Component {

    render() {
        let product = this.props.product
            return (

                    <div className="product_item">
                        <img src={catalogueStore.getImageById(product.main_image.id)} alt={product.name} />
                        <h5 className="product_title">{product.name}</h5>
                        <p className="product_size">{`${product.size} MM`}</p>
                        <p className="product_price">{`${product.price.value} ${product.price.unitAbbreviation}`}</p>
                        <Link to={`/product/${product.id}`}>See details</Link>
                    </div>

            )
    }

}




