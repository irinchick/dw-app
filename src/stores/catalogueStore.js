import { action, observable } from 'mobx'
import Api from "../utils/api";
import EmptyProduct from "../initial_data/product"

export class Store {

    @observable  loading = 0;
    @observable  products = [];
    @observable  assets = [];



    @action
    load() {
        this.loading +=1;

        return Api.Products.all().then((response)=>{
           return response.data.map((product) => this.loadProduct(product.id))
        }).then(promiseArray => {
            this.loading -=1;
                promiseArray.forEach(promise => {
                    promise.then(product => {
                        this.products.push(product)
                        this.loading -=1;

                    })
                })
        })


    }

    @action
    loadProduct(id) {
        this.loading +=1;
        return Api.Products.find(id).then((response)=>{
            return this._formProductObject(response.data)
        })

    }
    @action
    loadAsset(id) {
        this.loading +=1;
        return Api.Assets.find(id).then((response)=>{
            this.assets.push({id: id, uri: response.data.uri })
            this.loading -=1;
        })

    }
    @action
    _formProductObject(data){
        let product = Object.assign({}, EmptyProduct);
        product.id = data.id;
        if(data.elements.length){
            data.elements.forEach((element)=>{
                if(element.name === 'main_image'){
                    this.loadAsset(element.value.id).then(val => {
                        product[element.name] = val;
                    });
                }
                    product[element.name] = element.value

            })
        }
        return product
    }
    @action
    getImageById(id){
        let image = this.assets.filter(img=> img.id === id)[0]
        return image ? image.uri : null
    }
    @action
    getProductById(id){
        id = parseInt(id);
        let product = this.products.filter( p => p.id === id)[0]
        return product ? product : null
    }

}

const catalogueStore = new Store();
export default catalogueStore
