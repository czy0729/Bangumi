/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:17:42
 */
import { useContext } from 'react'
import { NavigationContext, NavigationProp } from '@react-navigation/native'
import { ParamListBase } from '@react-navigation/routers'
import { STORYBOOK } from '@constants'
import { Fn } from '@types'

const storybookFakeNavigation = {
  getState() {
    return {
      index: 1
    }
  },
  navigate() {},
  push() {},
  replace() {},
  goBack() {
    window.history.back()
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addListener(eventType: string): Fn {
    // console.info('Navigation: addListener', eventType)
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
