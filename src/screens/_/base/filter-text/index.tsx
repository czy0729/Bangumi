/*
 * @Author: czy0729
 * @Date: 2020-05-25 21:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:13:40
 */
import React from 'react'
import { Component, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

/** 已过滤 {value} 个敏感条目 */
export const FilterText = ob(
  ({ value }) => (
    <Component id='base-filter-text'>
      <Text style={_.mt.md} size={12} type='sub' align='center'>
        已过滤{value}个敏感条目
      </Text>
    </Component>
  ),
  COMPONENT
)
