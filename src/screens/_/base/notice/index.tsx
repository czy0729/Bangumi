/*
 * @Author: czy0729
 * @Date: 2023-11-02 13:28:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 08:04:23
 */
import React from 'react'
import { Component, Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as NoticeProps } from './types'

export { NoticeProps }

/** 轻提示 */
export const Notice = ob(({ style, children, ...other }) => {
  const styles = memoStyles()
  return (
    <Component id='base-notice' style={stl(styles.notice, style)}>
      <Text size={12} lineHeight={WEB ? 14 : 12} type='sub' {...other}>
        {children}
      </Text>
    </Component>
  )
}, COMPONENT)

export default Notice
