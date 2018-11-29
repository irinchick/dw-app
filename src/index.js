import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import ProductDetail from './views/CatalogueDetailView';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router,  Route} from 'react-router-dom';
import Catalog from "./views/Catalogue";
import {Switch} from "react-router";

ReactDOM.render(
    <Router >
        <Switch>
            <Route exact path="/" component={Catalog} />
            <Route path="/product/:id" component={ProductDetail} />
        </Switch>
    </Router>, document.getElementById('root'));
registerServiceWorker();
