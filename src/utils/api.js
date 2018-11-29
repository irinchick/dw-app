/**
 * Created by irynazirukina on 2018-11-27.
 */
import fetch from 'unfetch'
//import errorStore, { ErrorNamespaces } from '../stores/errorStore'



function returnProperResponseBody(response) {
    if(/text\/html/.test(response.headers.get('Content-Type'))) {
        return Promise.resolve(response.text())
    }else if(/stream/.test(response.headers.get('Content-Type'))) {
        return Promise.resolve(response.text())
    }else if(/javascript/.test(response.headers.get('Content-Type'))) {
        return Promise.resolve(response.text())
    }
    else {
        return Promise.resolve(response.json())
    }
}

const api_base_path = 'https://dev-api.danielwellington.com/frontend'
export function call ({ method, url, data, params }){

    let headers = {}

    return fetch(`${api_base_path}${url}`, {
        method:      method.toLowerCase(),
        baseURL:     api_base_path,
        body:        JSON.stringify(data),
        headers:     headers,
        params:      params ? params : {},
        credentials: 'same-origin'
    }).then((response) => {
        if(response.ok) {
            return returnProperResponseBody(response)
        } else {
            //errorStore.add(ErrorNamespaces.API, response.statusText);
            return returnProperResponseBody(response).then(response => Promise.reject(response))
        }
    })
};

const Api = {
    Products: {
        find: (id) => {
            return call({
                method: 'GET',
                url: `/products/${id}`
            })
        },
        all:() => {
            return call({
                method: 'GET',
                url: '/products',
            })
        }
    },
    Assets: {
        find: (id) => {
            return call({
                method: 'GET',
                url: `/assets/${id}`
            })
        }
    }
}




export default Api