import { MaterialIcons } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}

const EmojiPicker = ({ isVisible, onClose, children }: Props) => {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a stikcer</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="white" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  )
}

export default EmojiPicker

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  emojisContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
