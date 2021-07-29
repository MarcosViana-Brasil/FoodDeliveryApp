import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import { connect } from 'react-redux'
import Animated from 'react-native-reanimated'

import { setSelectedTab } from '../stores/tab/tabActions'
import { MainLayout } from '../screens'
import { COLORS, FONTS, SIZES, constants, icons, dummyData } from '../constants'

const Drawer = createDrawerNavigator()

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.customDrawerItem, { backgroundColor: isFocused ? COLORS.transparentBlack1 : null }} 
      onPress={onPress}
    >
      <Image source={icon} style={{width: 20, height: 20, tintColor: COLORS.white}} />
      <Text style={{marginLeft: 15, color: COLORS.white, ...FONTS.body3}}>{label}</Text>
    </TouchableOpacity>
  )
}

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
  return (
    <DrawerContentScrollView scrollEnabled={true} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: SIZES.radius }}>
        {/* Close button */}
        <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.closeDrawer()}>
            <Image source={icons.cross} style={styles.closeButtonImage} />
          </TouchableOpacity> 
        </View>

        {/* Profile */}
        <TouchableOpacity style={styles.profile} onPress={() => console.log('Profile')}>
          <Image source={dummyData.myProfile?.profile_image} style={styles.profileImage} />
          <View style={{ marginLeft: SIZES.radius }}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>{dummyData.myProfile?.name}</Text>
            <Text style={{color: COLORS.white, ...FONTS.body4}}>View your profile</Text>
          </View>
        </TouchableOpacity>

        {/* Drawer Items */}
        <View styles={{ flex: 1, marginTop: SIZES.padding }}>          
          <CustomDrawerItem 
            label={constants.screens.home} 
            icon={icons.home} 
            isFocus={selectedTab == constants.screens.home} 
            onPress={() => {
              setSelectedTab(constants.screens.home)
              navigation.navigate('MainLayout')
            }}
          />

          <CustomDrawerItem 
            label={constants.screens.my_wallet} 
            icon={icons.wallet} 
          />

          <CustomDrawerItem 
            label={constants.screens.notification} 
            icon={icons.notification} 
            isFocus={selectedTab == constants.screens.notification} 
            onPress={() => {
              setSelectedTab(constants.screens.notification)
              navigation.navigate('MainLayout')
            }}
          />

          <CustomDrawerItem 
            label={constants.screens.favourite} 
            icon={icons.favourite} 
            isFocus={selectedTab == constants.screens.favourite} 
            onPress={() => {
              setSelectedTab(constants.screens.favourite)
              navigation.navigate('MainLayout')
            }}
          />

          {/* line divider */}
          <View style={styles.linedivider} />
        
          <CustomDrawerItem label={constants.screens.track} icon={icons.location} />
        
          <CustomDrawerItem label={constants.screens.coupons} icon={icons.coupon} />
                
          <CustomDrawerItem label={constants.screens.settings} icon={icons.setting} />
                
          <CustomDrawerItem label={constants.screens.invite} icon={icons.profile} />    
        
          <CustomDrawerItem label={constants.screens.help} icon={icons.help} />
        </View>
      </View>

      <View style={{marginBottom: SIZES.padding, marginLeft: 15}}>
        <CustomDrawerItem label={constants.screens.logout} icon={icons.logout} />
      </View>
    </DrawerContentScrollView>
  )
}

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {

  const [progress, setProgress] = useState(new Animated.Value(0))

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  })

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26]
  })

  const animatedStyle = { borderRadius, transform: [{ scale }]}

  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerType='slide'
        overlayCode='transparent'
        drawerStyle={styles.drawerStyle}
        sceneContainerStyle={{backgroundColor:'transparent'}}
        initialRouteName='MainLayout'
        drawerContent={
          props => {
            setTimeout(() => {              
              setProgress(props.progress)
            }, 0)

            return (
              <CustomDrawerContent 
                navigation={props.navigation} 
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )
          }
        }
      >
        <Drawer.Screen name='MainLayout'>
          {props => <MainLayout {...props} drawerAnimatedStyle={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary
  },
  drawerStyle: { 
    flex:1,
    width: '65%',
    paddingRight: 20,
    backgroundColor: 'transparent'
  },
  closeButton: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
  closeButtonImage: { 
    height: 35,
    width: 35,
    tintColor: COLORS.white
  },
  profile: { 
    flexDirection: 'row',
    marginTop: SIZES.radius,
    alignItems: 'center',
    paddingBottom: 20
  },
  profileImage: { 
    width: 50,
    height: 50,
    borderRadius: SIZES.radius
  },
  customDrawerItem: { 
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: SIZES.radius,
    marginBottom: SIZES.base,
    borderRadius: SIZES.base,
    // backgroundColor
  },
  linedivider: { 
    height: 1,
    marginVertical: SIZES.radius,
    marginLeft: SIZES.radius,
    backgroundColor: COLORS.lightGray1
  } 
})

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)