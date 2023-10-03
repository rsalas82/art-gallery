import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import { ImageProps, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { captureRef } from 'react-native-view-shot'

import Button from '../../src/components/button'
import CircleButton from '../../src/components/circle-button'
import EmojiList from '../../src/components/emoji-list'
import EmojiPicker from '../../src/components/emoji-picker'
import EmojiSticker from '../../src/components/emoji-sticker'
import IconButton from '../../src/components/icon-button'
import ImageViewer from '../../src/components/image-viewer'

const PlaceholderImage = require('../../assets/images/background-image.png')

const ArtGallery = () => {
  const [selectedImage, setSelectedImage] = useState(PlaceholderImage)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [showModalOpen, setShowModalOpen] = useState(false)
  const [pickedSticker, setPickedSticker] = useState<ImageProps | null>(null)

  const imageRef = useRef()

  const [status, requestPermission] = MediaLibrary.usePermissions()

  if (status === null) {
    requestPermission()
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0])
      setShowAppOptions(true)
    } else {
      alert('You did not select any image!')
    }
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      })

      await MediaLibrary.saveToLibraryAsync(localUri)
      if (localUri) {
        alert('Saved!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setShowModalOpen(true)
  }

  const onModalClose = () => {
    setShowModalOpen(false)
  }

  const onPickEmoji = (emoji: ImageProps) => {
    setPickedSticker(emoji)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={selectedImage} />
          {pickedSticker !== null ? <EmojiSticker imageSize={40} emojiIcon={pickedSticker} /> : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton label="Reset" icon="refresh" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton label="Save" icon="save-alt" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={showModalOpen} onClose={onModalClose}>
        <EmojiList onSelect={onPickEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  )
}

export default ArtGallery

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
})
