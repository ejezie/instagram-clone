import React, { Component } from 'react'
import {View, Button, TextInput} from "react-native"
import firebase from 'firebase';

export class Login extends Component {
    constructor(props) {
        super();

        this.state = {
            email: "",
            password: "",
        }

        this.onSignIn = this.onSignIn.bind(this); 
    }

    onSignIn(){
        const {email, password} = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response)=>{
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

  render() {
    return (
      <View>
          {/* <TextInput placeholder='name' onChangeText={(name) => this.setState({name})}/> */}
          <TextInput placeholder='email' onChangeText={(email) => this.setState({email})}/>
          <TextInput secureTextEntry={true} placeholder='password' onChangeText={(password) => this.setState({password})}/>
          <Button onPress={()=> this.onSignUp()} title={"Sign IN"}/>
      </View>
    )
  }
}

export default Login