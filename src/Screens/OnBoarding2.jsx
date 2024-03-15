

import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, useWindowDimensions, Image, Animated, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { myColors } from '../Utils/MyColors'
import { StatusBar } from 'expo-status-bar'
import OnBoardingItem from '../Components/OnBoardingItem'
import { slides } from '../../AppData'
import Svg, { G, Circle } from "react-native-svg";
import { useNavigation } from '@react-navigation/native'


const OnBoarding2 = () => {
  const nav = useNavigation()
  const [page, setpage] = useState(0)
  const ref = useRef(null)
  const { width, height } = useWindowDimensions();

  const updateCurrentSlideIndex = e => {
    //console.log(`current page updateCurrentSlideIndex ->  ${page}`)
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    ref.current.scrollToIndex({ index: currentIndex })
    setpage(currentIndex);
  };

  const onscroll = () => {
    console.log(`current page onscroll ->  ${page}     ${slides.length - 1}`)
    if (page < slides.length - 1) {
      ref?.current.scrollToIndex({ index: page + 1 })
      setpage(page+1);
    } else {
      console.log("Last Item")
      nav.replace('Login');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <Image source={require('../assets/unnamed.png')}
        style={{
          resizeMode: 'center',
          alignSelf:'flex-end',
          width: 100,
          height: 100,
          marginTop: 50,
          marginEnd:20
        }}
      />

      <FlatList
        ref={ref}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
//        scrollEventThrottle={32}
        horizontal
        data={slides}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
        onscroll={onscroll}
        keyExtractor={(item) => item.id}
        bounces={false}
      />

      <View style={{ marginBottom: 60 }}>
        <NextBtn scrollTo={onscroll} percentage={(page + 1) * (100 / slides.length)} />

      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.primary,
  }
});


const NextBtn = ({ percentage, scrollTo }) => {
  const size = 100

  const strokewitdth = 2

  const center = size / 2

  const radius = size / 2 - strokewitdth / 2

  const circumference = 2 * Math.PI * radius

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start()
  }


  useEffect(() => {
    animation(percentage)
  }, [percentage])


  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100

      if (progressRef?.current) {
        progressRef.current.setNativeProps({ strokeDashoffset })
      }

    }, [percentage])

    return () => {
      progressAnimation.removeAllListeners()
    }

  }, [])


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokewitdth}
          />
          <Circle
            ref={progressRef}
            stroke="#F4338F"
            cx={center} cy={center} r={radius}
            strokeWidth={strokewitdth}
            strokeDasharray={circumference}

          />

        </G>
      </Svg>
      <TouchableOpacity onPress={scrollTo} style={{ position: 'absolute' }} activeOpacity={0.6}>

        <Image source={require('../assets/unnamed.png')}
          style={{
            resizeMode: 'contain',
            alignSelf: 'center',
            width: 50,
            height: 50,

          }}
        />
      </TouchableOpacity>
    </View>
  )

}

export default OnBoarding2


