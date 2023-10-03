import { Link, SplashScreen } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Index</Text>
      <View style={styles.containerNav}>
        <View style={styles.containerLink}>
          <Link href="/users" style={styles.links}>
            Users
          </Link>
        </View>
        <View style={styles.containerLink}>
          <Link href="/art-gallery" style={styles.links}>
            Art gallery
          </Link>
        </View>
        <View style={styles.containerLink}>
          <Link href="/todo-list" style={styles.links}>
            To-Do list
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'black',
    color: 'white',
  },
  containerNav: {
    flex: 1,
    gap: 8,
  },
  containerLink: {
    borderColor: 'blue',
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: '#2d2d2d',
    opacity: 0.7,
  },
  heading: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 20,
    paddingBottom: 40,
  },
  links: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
})
