/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 02:44:47
 */
import React from 'react'
import { Component, Flex, Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
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
  },
  COMPONENT
)

export default SectionHeader
