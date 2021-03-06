import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Main from './components/Main';
import Add from './components/main/Add'
import Save from './components/main/Save'


import * as firebase from "firebase";

import React, { Component } from 'react'
import { View, Text } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import rootReducer from "./redux/reducers/index"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Create redux store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); 
 
// firebase config 
const firebaseConfig = {
  apiKey: "AIzaSyBZNwzJ06cJUM88JbbzIrpV-ge0sP7m3AY",
  authDomain: "instagram-clone-54632.firebaseapp.com",
  projectId: "instagram-clone-54632",
  storageBucket: "instagram-clone-54632.appspot.com",
  messagingSenderId: "999824101611",
  appId: "1:999824101611:web:78e80d63a03b13b7756eae",
  measurementId: "G-CSQEGWXF8R"
};

// Initialise firebase
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

// Initialise stack navigator
const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }

  componentDidMount(){
    // Listen for authentification state change
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loaded: true,
          loggedIn: false,
        })
      }else{
        this.setState({
          loaded: true,
          loggedIn: true,
        })
      }
    })
  }

  render() {

    const {loaded, loggedIn} = this.state;

    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
           <Text>Loading...</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Landing'>
              <Stack.Screen name='Landing' component={Landing} options={{headerShown: false}}/>
              <Stack.Screen name='Register' component={Register}/>
              <Stack.Screen name='Login' component={Login}/>
            </Stack.Navigator>    
          </NavigationContainer>
      )
    }

    if(loggedIn){
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Add"
                component={Add}
                navigation={this.props.navigation}
              />
              <Stack.Screen
                name="Save"
                component={Save}
                navigation={this.props.navigation}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }

  }
}


