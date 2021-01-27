import React from 'react';
import {View} from 'react-native';
import Product from './src/screen/Product';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import reducer from './store/reducer';

const App = () => {
  const rootReducer = combineReducers({
    ProductData: reducer,
  });
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Product />
    </Provider>
  );
};

export default App;
