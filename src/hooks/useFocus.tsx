import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useState } from 'react'

const useFocus = (navigation: NavigationProp<ParamListBase>) => {
  const [isFocused, setIsFocused] = useState(false)

  navigation.addListener('focus', () => {
    setIsFocused(true)
  })
  navigation.addListener('blur', () => setIsFocused(false))

  return isFocused
}

export default useFocus
