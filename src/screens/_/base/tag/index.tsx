/*
 * @Author: czy0729
 * @Date: 2019-05-17 05:06:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 00:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Text } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { getTagType } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ViewStyle } from '@types'
import type { Props as TagProps } from './types'
export type { TagProps }

/** 标签 */
export const Tag = observer(
  ({ style, type, value, size = 10, align = 'center', children }: TagProps) => {
    r(COMPONENT)

    if (!value && !children) return null

    const styles = memoStyles()
    const { tagType, isActive, textType } = getTagType(type, value)

    return (
      <Component id='base-tag'>
        <Flex
          style={stl(
            styles.tag,
            styles[tagType] as ViewStyle,
            String(value).length >= 3 && styles.fix,
            style
          )}
          justify='center'
        >
          {value !== undefined && (
            <Text type={textType} size={size} shadow={isActive} bold align={align} noWrap>
              {value}
            </Text>
          )}
          {children}
        </Flex>
      </Component>
    )
  }
)

export default Tag
