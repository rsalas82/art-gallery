import { FontAwesome } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
  label: string
  theme?: string
  onPress: () => Promise<void> | void
}

const Button = ({ label, theme, onPress }: Props) => {
  if (theme === 'primary') {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: 'yellow', borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: 'white' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="black" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: 'black' }]}>{label}</Text>
        </Pressable>
      </View>
    )
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
})
