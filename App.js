import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import 'react-native-gesture-handler';
import * as firebase from "firebase";
import React, { Component } from 'react'
import { View, Text } from 'react-native';
 

const firebaseConfig = {
  apiKey: "AIzaSyBZNwzJ06cJUM88JbbzIrpV-ge0sP7m3AY",
  authDomain: "instagram-clone-54632.firebaseapp.com",
  projectId: "instagram-clone-54632",
  storageBucket: "instagram-clone-54632.appspot.com",
  messagingSenderId: "999824101611",
  appId: "1:999824101611:web:78e80d63a03b13b7756eae",
  measurementId: "G-CSQEGWXF8R"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

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
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
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
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
           <Text>Welcome back!</Text>
        </View>
      )
    }

  }
}


