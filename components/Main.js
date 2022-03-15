import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Feed from './auth/main/Feed'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

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
            <Tab.Screen name="Feed" component={Feed} />
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