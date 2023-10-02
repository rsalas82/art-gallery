import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props {
  icon: keyof typeof MaterialIcons.glyphMap
  label: string
  onPress: () => void
}

const IconButton = ({ icon, label, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.iconButton}>
      <MaterialIcons name={icon} size={24} color="white" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconButtonLabel: {
    color: 'white',
    marginTop: 12,
  },
})
