let store;

if (SUPPORTS_WEB_WORKERS === false) {
    let createStore = require('stockroom/inline');
    store = createStore(require('./worker'));
}
else {
    let createStore = require('stockroom');
    let StoreWorker = require('worker-loader!./worker');
    store = createStore(new StoreWorker());
}

export default store;