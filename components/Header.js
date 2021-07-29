import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { FONTS } from '../constants'


export default function Header({ containerStyle, title, leftComponent, rightComponent }) {
  return (
    <View style={{ flexDirection: 'row', ...containerStyle }}>
      {/* left */}
      {leftComponent}
      
      {/* title */}
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* right */}
      {rightComponent}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {    
  }, 
  titleView: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    ...FONTS.h3
  }
})
