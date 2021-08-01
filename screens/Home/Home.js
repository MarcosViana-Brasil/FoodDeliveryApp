import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, StyleSheet } from 'react-native'

import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants'
import { HorizontalFoodCard, VerticalFoodCard } from '../../components'


const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* header */}
      <View style={styles.sectionHeader}>
        <Text style={{ flex: 1, ...FONTS.h3}}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3}}>Show All</Text>
        </TouchableOpacity>
      </View>

      {/* content */}
      {children}

    </View>
  )
}

const Home = () => {

  const [selectedCategoryId, setSelectedCategoryId] = useState(1)
  const [selectedMenuType, setSelectedMenuType] = useState(1)
  const [popular, setPopular] = useState([])
  const [recommends, setRecommends] = useState([])
  const [menuList, setMenuList] = useState([])


  useEffect(() => {
      handleChangeCategory(selectedCategoryId, selectedMenuType)
  }, [])


  //handler
  function handleChangeCategory(categoryId, menuTypeId) {
    // retrieve the popular menu
    let selectedPopular = dummyData.menu.find(a => a.name == 'Popular')

    // retrieve the recommended menu
    let selectedRecommend = dummyData.menu.find(a => a.name == 'Recommended')

    // find the menu based on the menuTypeId
    let selectedMenu = dummyData.menu.find(a => a.id = menuTypeId)

    // set the popular menu based on the categoryId
    setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)))

    // set the recommended menu based on the categoryId
    setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))

    // set the menu based on the categoryId
    setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
  }

  // render
  function renderSearch() {
    return (
      <View style={styles.renderContainer}>
        {/* icon */}
        <Image source={icons.search} style={styles.searchIcon} />

        {/* text input */}
        <TextInput style={styles.inputText} placeholder="Search a food..." />

        {/* filter button */}
        <TouchableOpacity
        //onPress
        >
          <Image source={icons.filter} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 30, marginBottom: 20}}
        renderItem={({item, index}) => (
          <TouchableOpacity 
            style={{marginLeft: SIZES.padding, marginRight: index == dummyData.menu.length-1 ? SIZES.padding : 0}}
            onPress={() => {
              setSelectedMenuType(item.id)
              handleChangeCategory(selectedCategoryId, item.id)
            }}
          >
            <Text style={{color: selectedMenuType == item.id ? COLORS.primary : COLORS.black, ...FONTS.h3}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}      
      />
    )
  }

  function renderRecommendedSection() {
    return (
      <Section title='Recommended' onPress={console.log('Show all recommended')}>
        <FlatList
          data={recommends}
          horizontal
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <HorizontalFoodCard
              containerStyle={{
                height: 180,
                width: SIZES.width * 0.85,    
                paddingRight: SIZES.radius,
                alignItems: 'center',
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == recommends.length-1 ? SIZES.padding : 0
              }}
              imageStyle={{
                marginTop: 35,
                height: 150,
                width: 150
              }}
              item={item}
              onPress={() => console.log('HorizontalFoodCard')}
            />
          )}
        />
      </Section>
    )
  }

  function renderPopularSection() {
    return (
      <Section title='Popular Near Your' onPress={console.log('Show all popular items')}>
        <FlatList
          data={popular}
          horizontal
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <VerticalFoodCard 
              containerStyle={{
                // height: 180,
                // width: SIZES.width * 0.85,    
                // paddingRight: SIZES.radius,
                // alignItems: 'center',
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == popular.length-1 ? SIZES.padding : 0
              }}
              // imageStyle={{
              //   marginTop: 35,
              //   height: 150,
              //   width: 150
              // }}
              item={item}
              onPress={() => console.log('VerticalFoodCard')}
            />              
          )}
        />

      </Section>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {/* search */}
      {renderSearch()}

      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* popular section */}
            {renderPopularSection()}

            {/* recomended */}
            {renderRecommendedSection()}

            {/* menu type */}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <HorizontalFoodCard
              containerStyle={styles.containerStyle}
              imageStyle={styles.imageStyle}
              item={item}
              onPress={() => console.log('HorizontalFoodCard')}
            />
          )
        }}
      />        
    </View>
  )
}

const styles = StyleSheet.create({
  renderContainer: { 
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2
  },
  searchIcon: { 
    height: 20, 
    width: 20,
    tintColor: COLORS.black
  },
  inputText: {
    flex: 1, 
    marginLeft: SIZES.radius,
    ...FONTS.body3
  },
  filterIcon: { 
    height: 20, 
    width: 20,
    tintColor: COLORS.black
  },
  containerStyle: { 
    height: 130,
    alignItems: 'center',
    marginHorizontal: SIZES.padding, 
    marginBottom: SIZES.radius
  },
  imageStyle: { 
    marginTop: 20,
    height: 110,
    width: 110
  },
  sectionHeader: { 
    flexDirection: 'row',
    marginHorizontal: SIZES.padding, 
    marginTop: 30, 
    marginBottom: 20
  },
  
})

export default Home