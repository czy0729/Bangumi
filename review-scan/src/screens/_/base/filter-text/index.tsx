/*
 * @Author: czy0729
 * @Date: 2020-05-25 21:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 00:11:05
 */
import React from 'react'
import { Component, Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { Props as FilterTextProps } from './types'

export { FilterTextProps }

/** 已过滤 value 个敏感条目 */
export const FilterText = ob(
  ({ value }: FilterTextProps) => (
    <Component id='base-filter-text'>
      <Flex style={_.mt.md} justify='center'>
        <Text size={12} type='sub' align='center'>
          已过滤 {value} 个敏感条目
        </Text>
      </Flex>
    </Component>
  ),
  COMPONENT
)

export default FilterText
