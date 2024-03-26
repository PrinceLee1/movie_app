import { View, Text, Dimensions } from 'react-native'
import React from 'react'
var { width, height } = Dimensions.get('window');
import * as Progress from 'react-native-progress';
import { theme } from '../theme';

export default function Loading() {
  return (
    <View style={{height, width}} className="absolute justify-center flex-row items-center">
      <Progress.CircleSnail thickness={12} size={160} color={theme.background}/>
    </View>
  )
}