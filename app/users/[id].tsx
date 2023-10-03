import { FontAwesome } from '@expo/vector-icons'
import { router, useGlobalSearchParams } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

const UserView = () => {
  const { id, image, name, username, address, gender, age, email, postcode, country, city } = useGlobalSearchParams<{
    name: string
    id: string
    image: string
    address: string
    username: string
    age: string
    gender: string
    email: string
    postcode: string
    city: string
    country: string
  }>()

  const onGoBack = () => router.back()

  return (
    <>
      <View key={id} style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: image }} style={styles.imageContainer} />
          <Text style={styles.heading}>{username}</Text>
        </View>
        <View style={styles.descContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.bold}>Full name:</Text>
            <View>
              <Text style={styles.text}>{name}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.bold}>Age:</Text>
            <View>
              <Text style={styles.text}>{age}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.bold}>Email:</Text>
            <View>
              <Text style={styles.text}>{email}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.bold}>Gender:</Text>
            <View>
              <Text style={styles.text}>{gender}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.bold}>Address:</Text>
            <View>
              <Text style={styles.text}>{address}</Text>
              <Text style={styles.text}>
                {city} ({country})
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable onPress={onGoBack} style={styles.button}>
        <FontAwesome name="arrow-circle-o-left" size={32} color={'white'} />
        <Text style={{ color: 'white' }}>Go back</Text>
      </Pressable>
    </>
  )
}

export default UserView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'darkgreen',
    margin: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'lightgreen',
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: 'lightgreen',
  },
  descContainer: {
    flex: 1,
    backgroundColor: 'lightgreen',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 12,
    margin: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'darkgreen',
  },
  rowContainer: { flexDirection: 'row', gap: 8 },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'darkgreen',
  },
})
