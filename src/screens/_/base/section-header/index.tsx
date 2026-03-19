/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:24:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Text } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as SectionHeaderProps } from './types'
export type { SectionHeaderProps }

/** 块 (章节) 头 */
export const SectionHeader = observer(
  ({ style, type = 'title', size = 14, right, children }: SectionHeaderProps) => {
    r(COMPONENT)

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

export default SectionHeader
