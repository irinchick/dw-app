/**
 * Created by irynazirukina on 2018-11-28.
 */
import React, { Component } from 'react';
import '../assets/styles/ProductDetail.css';
import { observer } from 'mobx-react'
import catalogueStore from '../stores/catalogueStore'
import { Link } from "react-router-dom";




@observer
class ProductDetail extends Component {
    componentWillMount(){
        if(!catalogueStore.products.length){
            catalogueStore.load()
        }
    }

    render() {

        if (catalogueStore.loading)
            return <h1>Loading</h1>


        const { match: { params } } = this.props;
        let product = catalogueStore.getProductById(params.id);

        return (
        <div className="App">
            <header>
                <Link to={`/`}>Go back</Link>
            </header>
            <div className="product_detail">
                <div className="product_detail_item">
                    <div className="product_detail_visuals">
                        <img src={catalogueStore.getImageById(product.main_image.id)} alt={product.name} />
                    </div>
                    <div  className="product_detail_info">
                        <h1 className="product_title">{product.name}</h1>
                        <p className="product_detail_description">{product.description}</p>

                        <div className="product_price">
                            <h6>Price</h6>
                            {`${product.price.value} ${product.price.unitAbbreviation}`}
                        </div>
                        <div className="product_color">
                            <h6>Color</h6>
                            <div className="color_swatch"></div>
                        </div>
                        <div className="product_size">
                            <h6>Size</h6>
                            {`${product.size} MM`}
                        </div>
                    </div>

                </div>
            </div>
        </div>

        )
    }

}

export default ProductDetail;