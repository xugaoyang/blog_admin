import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const initState = {
  username: '',
  error: null,
  token: '',
}

function reducer(state = initState, action) {
  console.log('action', action)
  switch (action.type){
    case 'USERNAME':
      return {
        username: state.username
      }
    case 'GET_USER_BEGIN':
      return {
        ...state,

      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        username: action.payload.username
      }
    case 'GET_USER_FAILURE':
      return {
        ...state,
        error: action.payload.error
      }
    case 'GET_TOKEN':
      return {
        ...state,
        token: action.payload.token
      }
    default:
    return state
  }
}

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const myPersistReducer = persistReducer(persistConfig, reducer)
const store = createStore(myPersistReducer, applyMiddleware(thunk))

export const persistor = persistStore(store)
export default store