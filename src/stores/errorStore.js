import { action, observable } from 'mobx'


export class Store {


    @action
    load() {

    }

    @action
    reset(){

    }


}

const errorStore = new Store();
export default errorStore
