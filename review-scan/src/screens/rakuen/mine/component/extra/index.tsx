/*
 * @Author: czy0729
 * @Date: 2022-02-24 18:55:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:29:09
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, TYPE_DS } from './ds'
import { styles } from './styles'

let type: string

function Extra({ $ }: Ctx) {
  // 缓存最近一次确定值
  if ($) type = $.state.type

  const currentType = $?.state.type === undefined ? type : $?.state.type
  return (
    <SegmentedControl
      key={currentType}
      style={styles.segment}
      size={11}
      values={TYPE_DS}
      selectedIndex={currentType === 'mine' ? 0 : 1}
      onValueChange={$?.onChange}
    />
  )
}

export default ob(Extra, COMPONENT)
