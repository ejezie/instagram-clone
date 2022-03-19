import React from 'react'
import { View, Text, Image, TextInput, Button } from 'react-native'
import { useState } from 'react';

import firebase from 'firebase';
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save(props) {

  // Fire store image upload to path
  const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(35)}`

  // Text input caption state
  const [caption, setCaption] = useState();

  // This function handles image upload to firestore
   const uploadImage = async () => {

    const uri = props.route.params.image; 
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload image to firestore
    const task = firebase.storage().ref().child(childPath).put(blob);

    
    // check file upload status
    const taskProgress = snapshot => {
      console.log(`progress: ${snapshot.bytesTransferred}`)
    }

    // Check if file upload is complete
    const taskCompleted = () => { 
      task.snapshot.ref.getDownloadURL().then(snapshot=>{
        console.log(snapshot);
      })
    }

    // see file transfer error
    const taskError = snapshot => {
      console.log(snapshot); 
    }

    // assign functions to firestore task upload instance
    task.on("state_changed", taskProgress, taskError, taskCompleted);

   }

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} style={{flex: 0.5, flexDirection: 'row'}} />
      <TextInput placeholder='Add caption' onChangeText={(caption)=>setCaption(caption)}/>
      <Button title='Upload' onPress={()=>uploadImage()}/>
    </View>
  );
}
