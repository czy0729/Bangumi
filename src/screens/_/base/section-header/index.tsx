/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 00:14:37
 */
import React from 'react'
import { Component, Flex, Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as SectionHeaderProps } from './types'

export { SectionHeaderProps }

/** 块(章节) 头 */
export const SectionHeader = ob(
  ({ style, type = 'title', size = 14, right, children }: SectionHeaderProps) => {
    const styles = memoStyles()
    return (
      <Component id='base-section-header'>
        <Flex style={stl(styles.section, style)}>
          <Flex.Item>
            <Text type={type} size={size} bold>
              {children}{' '}
            </Text>
          </Flex.Item>
          {right}
        </Flex>
      </Component>
    )
  }
)
