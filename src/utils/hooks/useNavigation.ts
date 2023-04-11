/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 15:35:30
 */
import { useContext } from 'react'
import { NavigationContext, NavigationProp } from '@react-navigation/native'
import { ParamListBase } from '@react-navigation/routers'
import { STORYBOOK } from '@constants'

const storybookFakeNavigation = {
  getState() {},
  navigate() {},
  push() {},
  replace() {},
  goBack() {
    window.history.back()
  },
  addListener() {
    return () => {}
  },
  setOptions() {}
} as const

/**
 * Hook to access the navigation prop of the parent screen anywhere.
 * @returns Navigation prop of the parent screen.
 */
export default function useNavigation<T extends NavigationProp<ParamListBase>>(): T {
  const navigation = useContext(NavigationContext)

  if (navigation === undefined) {
    if (STORYBOOK) {
      return storybookFakeNavigation as unknown as T
    }

    throw new Error(
      "Couldn't find a navigation object. Is your component inside a screen in a navigator?"
    )
  }

  return navigation as T
}
