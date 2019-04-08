import React from 'react';

import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from 'reducers'
import RootView from "./RootView";
import thunk from "redux-thunk";
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSensitiveStorage from "redux-persist-sensitive-storage";
import {PersistGate} from "redux-persist/lib/integration/react";

const middleware = [thunk];

if (__DEV__) {
  require('./config/ReactoTronConfig');
}

// todo: figure out if you want to safely store tokens
const storage = createSensitiveStorage({
  keychainService: 'sogosKeychain',
  sharedPreferencesName: 'sogosSharedPreferences',
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['security'],
};

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...middleware));
const persistor = persistStore(store);

export default () =>
  <Provider store={store}>
    {/*todo: loading indicator*/}
    <PersistGate persistor={persistor}>
      <RootView/>
    </PersistGate>
  </Provider>