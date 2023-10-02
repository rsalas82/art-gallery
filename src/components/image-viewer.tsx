import { Image, ImageSourcePropType, StyleSheet } from 'react-native'

interface Props {
  placeholderImageSource: ImageSourcePropType
}

const ImageViewer = ({ placeholderImageSource }: Props) => {
  return <Image source={placeholderImageSource} style={styles.image} />
}

export default ImageViewer

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})
