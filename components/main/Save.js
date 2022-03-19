import React from 'react'
import { View, Text, Image } from 'react-native'

export default function Save({props}) {

    console.log(props.image, ".....prop")

  return (
    <View>
        <Text>
            <Image source={{uri: props}} style={{flex: 1}}/>
        </Text>
    </View>
  )
}
