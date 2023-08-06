/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 19:48:37
 */
import { useContext } from 'react'
import { NavigationContext } from '@react-navigation/native'
import { STORYBOOK } from '@constants'
import { Navigation } from '@types'

/**
 * Hook to access the navigation prop of the parent screen anywhere.
 * @returns Navigation prop of the parent screen.
 */
export default function useNavigation(): Navigation {
  const navigation = useContext(NavigationContext)

  if (navigation === undefined) {
    if (STORYBOOK) {
      return require('@components/storybook/navigation')
        .StorybookNavigation as Navigation
    }

    throw new Error(
      "Couldn't find a navigation object. Is your component inside a screen in a navigator?"
    )
  }

  return navigation as unknown as Navigation
}
