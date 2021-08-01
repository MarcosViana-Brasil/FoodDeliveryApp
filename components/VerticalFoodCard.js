import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { COLORS, FONTS, SIZES, icons } from '../constants'

const VerticalFoodCard = ({ containerStyle, item, onPress }) => {
  return (
    <TouchableOpacity 
      style={{
        width: 200,
        height: 300,
        padding: SIZES.radius,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle
      }}
    >
      {/* calories and favourite */}
      <View styles={{flexDirection: 'row'}}>
        {/* calories */}
        <View style={{flex:1, flexDirection: 'row'}}>
          <Image 
            source={icons.calories}
            style={{width: 30, height: 30}}
          />
          <Text style={{color: COLORS.darkGray2, ...FONTS.body5}}>
            {item.calories} calories              
          </Text>

          {/* favourite */}
          <Image 
            source={icons.love}
            style={{width: 20, height: 20, marginLeft: 50, tintColor: item.isFavourite ? COLORS.primary : COLORS.gray}}
          />
        </View>

      </View>

      {/* image */}
      <View style={{ height: 150, width: 150, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={item.image} style={{ height: '100%', width: '100%' }} />
      </View>


{/* parei vídeo 1:37:35 */}


      {/* info */}

    </TouchableOpacity>
  )
}

export default VerticalFoodCard
