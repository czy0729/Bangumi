/*
 * @Author: czy0729
 * @Date: 2020-05-25 21:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-25 21:15:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'

function FilterText({ value }) {
  return (
    <Text style={_.mt.md} size={12} type='sub' align='center'>
      已过滤{value}个敏感条目
    </Text>
  )
}

export default observer(FilterText)
