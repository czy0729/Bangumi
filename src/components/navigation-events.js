/*
 * react-navigation@3 [NavigationEvents] => react-navigation@6 [Navigation events]
 * https://reactnavigation.org/docs/navigation-events
 *
 * @Author: czy0729
 * @Date: 2022-03-07 14:45:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-07 15:00:43
 */
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export const NavigationEvents = ({
  onWillFocus,
  onDidFocus,
  onWillBlur,
  onDidBlur
}) => {
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
