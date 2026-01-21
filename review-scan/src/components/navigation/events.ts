/*
 * react-navigation@3 [NavigationEvents] => react-navigation@6 [Navigation events]
 * @Doc: https://reactnavigation.org/docs/navigation-events
 * @Author: czy0729
 * @Date: 2022-03-07 14:45:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:05:11
 */
import { useEffect } from 'react'
import { r } from '@utils/dev'
import { useNavigation } from '@utils/hooks'
import { COMPONENT_EVENTS } from './ds'
import { NavigationEventsProps } from './types'

export const NavigationEvents = ({
  onWillFocus,
  onDidFocus,
  onWillBlur,
  onDidBlur
}: NavigationEventsProps) => {
  r(COMPONENT_EVENTS)

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
