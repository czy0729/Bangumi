/*
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:28:19
 */
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { WSA } from '@constants'
import { COMPONENT } from './ds'

import type { Props as StatusBarPlaceholderProps } from './types'
export type { StatusBarPlaceholderProps }

/** 状态栏高度占位 */
export const StatusBarPlaceholder = observer(({ style }: StatusBarPlaceholderProps) => {
  r(COMPONENT)

  const { top } = useSafeAreaInsets()

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

export default StatusBarPlaceholder
