import { useFonts } from '@expo-google-fonts/inter'
import { Slot, SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const image1 = require('../assets/images/emoji1.png')
const image2 = require('../assets/images/emoji2.png')
const image3 = require('../assets/images/emoji3.png')

SplashScreen.preventAutoHideAsync()

export default function HomeLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PixelifySans: require('../assets/fonts/PixelifySans-VariableFont_wght.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  )
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 48, fontFamily: 'PixelifySans' }}>HOME</Text>
    </View>
  )
}

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Image source={image1} style={styles.image} />
      <Image source={image2} style={styles.image} />
      <Image source={image3} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  image: {
    width: 24,
    height: 24,
  },
})
