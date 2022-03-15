import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from "../redux/action/index" 


export class Main extends Component {

  componentDidMount(){
    this.props.fetchUser
    }

  render() {
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <Text>Welcome Back!</Text>
      </View>
    )
  }
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(null, mapDispatchProps)(Main)