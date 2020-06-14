import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux' //to combine multiple reducers
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from  'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer, //stores information about the authentication
    project: projectReducer,
    //synching firestore to my state  
    firestore: firestoreReducer, 
    //for authentication
    firebase: firebaseReducer
})

export default rootReducer;