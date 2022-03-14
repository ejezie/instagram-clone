import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingScreen'>
         <Stack.Screen name='LandingScreen' component={LandingScreen} options={{headerShown: false}}/>
      </Stack.Navigator>    
    </NavigationContainer>
  );
}

