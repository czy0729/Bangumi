/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:44:27
 */
import { useContext } from 'react'
import { NavigationContext } from '@react-navigation/native'
import { WEB } from '@constants/device'
import { Navigation } from '@types'

/**
 * Hook to access the navigation prop of the parent screen anywhere.
 * @returns Navigation prop of the parent screen.
 */
export default function useNavigation(): Navigation {
  const navigation = useContext(NavigationContext)

  if (navigation === undefined) {
    if (WEB) {
      return require('@components/storybook/navigation').StorybookNavigation as Navigation
    }

    throw new Error(
      "Couldn't find a navigation object. Is your component inside a screen in a navigator?"
    )
  }

  return navigation as unknown as Navigation
}
