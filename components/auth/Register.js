import React, { Component } from 'react'
import {View, Button, TextInput} from "react-native"
import firebase from 'firebase';

export class Register extends Component {
    constructor(props) {
        super();

        this.state = {
            email: "",
            password: "",
            name: "",
        }

        this.onSignUp = this.onSignUp.bind(this); 
    }

    onSignUp(){
        const {email, password, name} = this.state
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
          <TextInput placeholder='name' onChangeText={(name) => this.setState({name})}/>
          <TextInput placeholder='email' onChangeText={(email) => this.setState({email})}/>
          <TextInput secureTextEntry={true} placeholder='password' onChangeText={(password) => this.setState({password})}/>
          <Button onPress={()=> this.onSignUp()} title={"Sign Up"}/>
      </View>
    )
  }
}

export default Register