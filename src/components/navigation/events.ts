/*
 * react-navigation@3 [NavigationEvents] => react-navigation@6 [Navigation events]
 * https://reactnavigation.org/docs/navigation-events
 *
 * @Author: czy0729
 * @Date: 2022-03-07 14:45:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-02 14:28:34
 */
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

type Props = {
  onWillFocus?: () => any
  onDidFocus?: () => any
  onWillBlur?: () => any
  onDidBlur?: () => any
}

export const NavigationEvents = ({
  onWillFocus,
  onDidFocus,
  onWillBlur,
  onDidBlur
}: Props) => {
  const navigation = useNavigation()

  useEffect(() => {
    if (onWillFocus || onDidFocus) {
      const unsubscribe = navigation.addListener('focus', () => {
        if (typeof onWillFocus === 'function') onWillFocus()
        if (typeof onDidFocus === 'function') onDidFocus()
      })
      return unsubscribe
    }
  }, [navigation, onWillFocus, onDidFocus])

  useEffect(() => {
    if (onWillBlur || onDidBlur) {
      const unsubscribe = navigation.addListener('focus', () => {
        if (typeof onWillBlur === 'function') onWillBlur()
        if (typeof onDidBlur === 'function') onDidBlur()
      })
      return unsubscribe
    }
  }, [navigation, onWillBlur, onDidBlur])

  return null
}
