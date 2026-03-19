/*
 * @Author: czy0729
 * @Date: 2020-05-25 21:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:22:05
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props as FilterTextProps } from './types'
export type { FilterTextProps }

/** 已过滤 value 个敏感条目 */
export const FilterText = observer(({ value }: FilterTextProps) => {
  r(COMPONENT)

  return (
    <Component id='base-filter-text'>
      <Flex style={_.mt.md} justify='center'>
        <Text size={12} type='sub' align='center'>
          已过滤 {value} 个敏感条目
        </Text>
      </Flex>
    </Component>
  )
})

export default FilterText
