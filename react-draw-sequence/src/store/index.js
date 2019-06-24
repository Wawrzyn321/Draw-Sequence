import { createStore } from 'redux';
import { reducers } from './../reducers';
import { defaultState } from './defaultState';

const store = createStore(
    reducers,
    defaultState
  );

export default store;
