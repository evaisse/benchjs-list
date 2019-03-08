
import createStore from "stockroom";
import StoreWorker from 'worker-loader!./worker';

const SUPPORTS_WEB_WORKERS = true;

import devtools from 'unistore/devtools';

let store = devtools(createStore(new StoreWorker()));

export default store;