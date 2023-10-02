import { Image, ImageProps, View } from 'react-native'

interface Props {
  emojiIcon: ImageProps
  imageSize: number
}

const EmojiSticker = ({ emojiIcon, imageSize }: Props) => {
  return (
    <View style={{ top: -350 }}>
      <Image source={emojiIcon} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />
    </View>
  )
}

export default EmojiSticker
