import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Feed from './auth/main/Feed'
import Add from './auth/main/Add'
import Profile from './auth/main/Profile'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from "../redux/action/index" 

const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {

  componentDidMount(){
    this.props.fetchUser();
    }

  render() {
    //   const {currentUser} = this.props;
    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={Feed} 
            options={{tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" size={26} color={color}/>
            )}}/>
            <Tab.Screen name="Profile" component={Profile} 
            options={{tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="account-circle" size={26} color={color}/>
            )}}/>
            <Tab.Screen name="Add" component={Add} 
            options={{tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="plus-box" size={26} color={color}/>
            )}}/>
        </Tab.Navigator>
    )
  }
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);
const mapStateProps = (store) => {
    return {
        currentUser: store.userState.currentUser
    }
};

export default connect(mapStateProps, mapDispatchProps)(Main)