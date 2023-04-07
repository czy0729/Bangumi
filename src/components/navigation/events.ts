/*
 * react-navigation@3 [NavigationEvents] => react-navigation@6 [Navigation events]
 * @Doc: https://reactnavigation.org/docs/navigation-events
 * @Author: czy0729
 * @Date: 2022-03-07 14:45:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 04:54:46
 */
import { useEffect } from 'react'
import { useNavigation } from '@utils/hooks'

type Props = {
  /** 聚焦前，在 react-navigation@5 后，与 onDidFocus 合并，同时只使用一个即可 */
  onWillFocus?: () => any

  /** 聚焦后，在 react-navigation@5 后，与 onWillFocus 合并，同时只使用一个即可 */
  onDidFocus?: () => any

  /** 失去焦点前，在 react-navigation@5 后，与 onDidBlur 合并，同时只使用一个即可 */
  onWillBlur?: () => any

  /** 失去焦点后，在 react-navigation@5 后，与 onWillBlur 合并，同时只使用一个即可 */
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
