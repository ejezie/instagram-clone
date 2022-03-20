import React from "react";
import { View, Text, Image, TextInput, Button } from "react-native";
import { useState } from "react";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props) {
  // Fire store image upload to path
  const childPath = `post/${
    firebase.auth().currentUser.uid
  }/${Math.random().toString(35)}`;

  // Text input caption state
  const [caption, setCaption] = useState();
  console.log(props, "-------props")

  // This function handles image upload to firebase storage
  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload image to storage
    const task = firebase.storage().ref().child(childPath).put(blob);

    // check file upload status
    const taskProgress = (snapshot) => {
      console.log(`progress: ${snapshot.bytesTransferred}`);
    };

    // Check if file upload is complete
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        console.log(snapshot);

        // save image to firetstore
        savePostFirestore(snapshot);
      });
    };

    // see file transfer error
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    // assign functions to firebase storage task upload instance
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostFirestore = (downloadUrl) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadUrl,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((function(){
        props.navigation.popToTop();
        console.log("----------sucess")
      })).catch(
        console.error
      )
  };

  console.log(caption, "___-cap");

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: props.route.params.image }}
        style={{ flex: 0.5, flexDirection: "row" }}
      />
      <TextInput
        placeholder="Add caption"
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Upload" onPress={() => uploadImage()} />
    </View>
  );
}
