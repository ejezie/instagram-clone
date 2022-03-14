import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import 'react-native-gesture-handler';
import * as firebase from "firebase";

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing'>
         <Stack.Screen name='Landing' component={Landing} options={{headerShown: false}}/>
         <Stack.Screen name='Register' component={Register}/>
         <Stack.Screen name='Login' component={Login}/>
      </Stack.Navigator>    
    </NavigationContainer>
  );
}

