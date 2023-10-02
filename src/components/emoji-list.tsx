import { useState } from 'react'
import { FlatList, Image, ImageProps, Platform, Pressable, StyleSheet } from 'react-native'

interface Props {
  onSelect: (item: ImageProps) => void
  onCloseModal: () => void
}

const EmojiList = ({ onSelect, onCloseModal }: Props) => {
  const [emojis] = useState([
    require('../../assets/images/emoji1.png'),
    require('../../assets/images/emoji2.png'),
    require('../../assets/images/emoji3.png'),
    require('../../assets/images/emoji4.png'),
    require('../../assets/images/emoji5.png'),
    require('../../assets/images/emoji6.png'),
  ])

  const onPickEmoji = (item: ImageProps) => {
    onSelect(item)
    onCloseModal()
  }

  return (
    <FlatList
      data={emojis}
      renderItem={({ item, index }) => {
        return (
          <Pressable onPress={() => onPickEmoji(item)}>
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        )
      }}
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      contentContainerStyle={styles.listContainer}
    />
  )
}

export default EmojiList

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
})
