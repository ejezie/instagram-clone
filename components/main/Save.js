import React from 'react'
import { View, Text, Image } from 'react-native'

export default function Save(props) {

    console.log(props.route.params.image, ".....prop");

  return (
    <View style={{ flex: 1 }}>
      <Text>hell0</Text>
      <Image source={{ uri: props.route.params.image }} style={{flex: 0.5, flexDirection: 'row'}} />
    </View>
  );
}
