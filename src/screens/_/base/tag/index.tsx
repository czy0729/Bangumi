/*
 * @Author: czy0729
 * @Date: 2019-05-17 05:06:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:31:06
 */
import React from 'react'
import { Component, Flex, Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { getType } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TextType } from '@components'
import type { Props as TagProps } from './types'
export type { TagProps }

/** 标签 */
export const Tag = ob(({ style, type, value, size = 10, align = 'center', children }: TagProps) => {
  if (!value && !children) return null

  const styles = memoStyles()

  const tagType = type || getType(value) || _.select('plain', 'title')
  const isActive = tagType.includes('Active')

  const textType = (
    isActive ? _.select('plain', 'title') : _.select('sub', tagType === 'plain' ? 'sub' : tagType)
  ) as TextType

  return (
    <Component id='base-tag'>
      <Flex
        style={stl(styles.tag, styles[tagType], String(value).length >= 3 && styles.fix, style)}
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
}, COMPONENT)

export default Tag
