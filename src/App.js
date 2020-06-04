
import React from 'react';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./Reducers"
import Routers from './Router';
import firebase from "firebase";
import ReduxThunk from "redux-thunk";
class App extends React.Component {
  componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyBPnjCi7ftvikD_2m8dHBsQ9ggdsCv3_So",
      authDomain: "notekeeper-8e251.firebaseapp.com",
      databaseURL: "https://notekeeper-8e251.firebaseio.com",
      projectId: "notekeeper-8e251",
      storageBucket: "notekeeper-8e251.appspot.com",
      messagingSenderId: "591624751031",
      appId: "1:591624751031:web:12b2105db096bdbc6e4a32"
    };
    firebase.initializeApp(firebaseConfig);
  }
  render(){
    return (
       <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
          <Routers/>
          </Provider>
   
    );
  }
  
}


export default App;
