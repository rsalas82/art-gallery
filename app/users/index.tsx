import { router } from 'expo-router'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { useUsers } from '../../src/hooks/useUsers'
import { FlatUser } from '../../src/types/types'

const Users = () => {
  const [searchText, setSearchText] = useState<string>('')
  const users = useUsers(searchText)

  const handleSearchTextChange = (value: string) => {
    setSearchText(value)
  }

  const handleViewUserPress = ({
    id,
    name,
    image,
    username,
    address,
    gender,
    email,
    age,
    postcode,
    country,
    city,
  }: FlatUser) => {
    router.push({
      pathname: '/users/[id]',
      params: { id, name, image, username, address, gender, email, age, postcode, country, city },
    })
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchText}
        onChangeText={handleSearchTextChange}></TextInput>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <Pressable key={item.id} style={styles.container} onPress={() => handleViewUserPress({ ...item })}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.text}>{item.name}</Text>
            </Pressable>
          )
        }}></FlatList>
    </View>
  )
}

export default Users

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'lightgreen',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 12,
    margin: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'darkgreen',
  },
  text: {
    fontSize: 18,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: 'darkgreen',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
