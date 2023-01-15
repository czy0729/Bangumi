/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 15:18:59
 */
import React from 'react'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as SectionHeaderProps } from './types'

export { SectionHeaderProps }

export const SectionHeader = ob(
  ({ style, type = 'title', size = 14, right, children }: SectionHeaderProps) => {
    const styles = memoStyles()
    return (
      <Flex style={style ? [styles.section, style] : styles.section}>
        <Flex.Item>
          <Text type={type} size={size} bold>
            {children}{' '}
          </Text>
        </Flex.Item>
        {right}
      </Flex>
    )
  }
)
