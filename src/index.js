import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//redux imports
//note applyMiddleware is there so I'll be able to Use Thunkand and composefor store ehancer
// import { createStore, applyMiddleware } from 'redux';

import { createStore, applyMiddleware, compose } from 'redux';

//my root reducer (created by me)
import rootReducer from './store/reducers/rootReducer';

// enables the binding of react and redux together
import { Provider, useSelector } from 'react-redux';

//importing thunk from 'redux-thunk' to enable one to make an action creator, an action creator returns a function 
//rather than just action. Also, action creator enables you to make asyncronous  call to the database
import thunk from 'redux-thunk';

//for firestore
import { createFirestoreInstance, getFirestore, reduxFirestore} from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import firebase from 'firebase/app';
import fbConfig from './config/fbConfig';


const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true 
}

// to prevent for navbar links flashing

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div className="center">loading...</div>;
  return children
}


const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase})),
    reduxFirestore(firebase,fbConfig),
    
  )
)

const rrfProps = {
  firebase: fbConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}
ReactDOM.render(
  <React.StrictMode>
  {/* Provider at work */}
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
