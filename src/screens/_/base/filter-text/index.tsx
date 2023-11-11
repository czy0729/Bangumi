/*
 * @Author: czy0729
 * @Date: 2020-05-25 21:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 23:12:22
 */
import React from 'react'
import { Component, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

/** 已过滤{value}个敏感条目 */
export const FilterText = ob(({ value }) => (
  <Component id='base-filter-text'>
    <Text style={_.mt.md} size={12} type='sub' align='center'>
      已过滤{value}个敏感条目
    </Text>
  </Component>
))
