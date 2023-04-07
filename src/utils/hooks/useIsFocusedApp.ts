/*
 * @Author: czy0729
 * @Date: 2023-04-08 05:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 05:10:34
 */
import * as React from 'react'
import { useState } from 'react'
import { STORYBOOK } from '@constants'
import useNavigation from './useNavigation'

/**
 * Hook to get the current focus state of the screen. Returns a `true` if screen is focused, otherwise `false`.
 * This can be used if a component needs to render something based on the focus state.
 */
export default function useIsFocusedApp(): boolean {
  const navigation = useNavigation()
  const [isFocused, setIsFocused] = useState(STORYBOOK ? true : navigation.isFocused)

  const valueToReturn = STORYBOOK ? true : navigation.isFocused()
  if (isFocused !== valueToReturn) {
    // If the value has changed since the last render, we need to update it.
    // This could happen if we missed an update from the event listeners during re-render.
    // React will process this update immediately, so the old subscription value won't be committed.
    // It is still nice to avoid returning a mismatched value though, so let's override the return value.
    // This is the same logic as in https://github.com/facebook/react/tree/master/packages/use-subscription
    setIsFocused(valueToReturn)
  }

  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => setIsFocused(true))
    const unsubscribeBlur = navigation.addListener('blur', () => setIsFocused(false))
    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation])

  React.useDebugValue(valueToReturn)

  return valueToReturn
}
