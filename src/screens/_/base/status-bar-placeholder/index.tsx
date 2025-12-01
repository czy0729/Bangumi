/*
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 12:53:05
 */
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Component } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { WSA } from '@constants'
import { COMPONENT } from './ds'
import { Props as StatusBarPlaceholderProps } from './types'

export { StatusBarPlaceholderProps }

/** 状态栏高度占位 */
export const StatusBarPlaceholder = ({ style }: StatusBarPlaceholderProps) => {
  r(COMPONENT)

  const { top } = useSafeAreaInsets()

  return useObserver(() => {
    if (WSA) return null

    return (
      <Component
        id='base-status-bar-placeholder'
        style={stl(
          {
            height: top
          },
          style
        )}
      />
    )
  })
}

export default StatusBarPlaceholder
