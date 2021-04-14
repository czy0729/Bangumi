/*
 * @Author: czy0729
 * @Date: 2020-05-25 21:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 17:48:48
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const FilterText = ob(({ value }) => (
  <Text style={_.mt.md} size={12} type='sub' align='center'>
    已过滤{value}个敏感条目
  </Text>
))
