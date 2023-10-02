import { Image, ImageProps, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

interface Props {
  emojiIcon: ImageProps
  imageSize: number
}

const AnimatedImage = Animated.createAnimatedComponent(Image)
const AnimatedView = Animated.createAnimatedComponent(View)

const EmojiSticker = ({ emojiIcon, imageSize }: Props) => {
  const scaleImage = useSharedValue(imageSize)
  const position = useSharedValue({ x: 0, y: 0 })
  const start = useSharedValue({ x: 0, y: 0 })

  const onDoubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onEnd(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      }
    })

  const onDrag = Gesture.Pan()
    .onStart(() => {
      start.value = {
        x: position.value.x,
        y: position.value.y,
      }
    })
    .onUpdate(e => {
      position.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      }
    })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
      transform: [{ translateX: withSpring(position.value.x) }, { translateY: withSpring(position.value.y) }],
    }
  })

  const gestures = Gesture.Race(onDoubleTap, onDrag)

  return (
    <AnimatedView style={{ top: -350 }}>
      <GestureDetector gesture={gestures}>
        <AnimatedImage
          source={emojiIcon}
          style={[imageStyle, { width: imageSize, height: imageSize }]}
          resizeMode="contain"
        />
      </GestureDetector>
    </AnimatedView>
  )
}

export default EmojiSticker
