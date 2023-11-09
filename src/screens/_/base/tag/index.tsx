/*
 * 标签
 * @Author: czy0729
 * @Date: 2019-05-17 05:06:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 08:21:09
 */
import React from 'react'
import { Component, Flex, Text, TextType } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { getType } from './utils'
import { memoStyles } from './styles'
import { Props as TagProps } from './types'

export { TagProps }

export const Tag = ob(
  ({ style, type, value, size = 10, align = 'center', children }: TagProps) => {
    if (!value && !children) return null

    const _type = type || getType(value) || _.select('plain', 'title')
    const isActive = _type.includes('Active')

    const styles = memoStyles()
    const _styles = [styles.tag, styles[_type]]
    if (String(value).length >= 3) _styles.push(styles.fix)
    _styles.push(style)

    return (
      <Component id='tag'>
        <Flex style={_styles} justify='center'>
          {value !== undefined && (
            <Text
              type={
                isActive
                  ? _.select('plain', 'title')
                  : (_.select('sub', _type) as TextType)
              }
              size={size}
              shadow={isActive}
              bold
              align={align}
            >
              {value}
            </Text>
          )}
          {children}
        </Flex>
      </Component>
    )
  }
)
