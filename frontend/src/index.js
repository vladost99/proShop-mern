import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import 'index.css';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import RootStore from 'store/rootStore';
import {injectStores} from '@mobx-devtools/tools';
import { configure } from 'mobx';
configure({ isolateGlobalState: true});

const store = new RootStore();

injectStores({
    store
})

export const Context = createContext({store});

async function init() {
    try {
        await store.userStore.checkAuth();
    }
    finally {
        ReactDOM.render(
            <Context.Provider value={{store}}>
                <App />
            </Context.Provider>,
        document.getElementById('root')
        );
    }
}


init();



reportWebVitals();
