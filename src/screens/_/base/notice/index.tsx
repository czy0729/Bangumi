/*
 * @Author: czy0729
 * @Date: 2023-11-02 13:28:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:49:54
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Text } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as NoticeProps } from './types'
export type { NoticeProps }

/** 轻提示 */
export const Notice = observer(({ style, children, ...other }) => {
  r(COMPONENT)

  const styles = memoStyles()

  return (
    <Component id='base-notice' style={stl(styles.notice, style)}>
      <Text size={12} lineHeight={WEB ? 14 : 12} type='sub' {...other}>
        {children}
      </Text>
    </Component>
  )
})

export default Notice
