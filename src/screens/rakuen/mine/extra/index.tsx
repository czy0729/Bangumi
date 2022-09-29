/*
 * @Author: czy0729
 * @Date: 2022-02-24 18:55:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:25:54
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const typeDS = ['我的', '全部'] as const
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
      values={typeDS}
      selectedIndex={currentType === 'mine' ? 0 : 1}
      onValueChange={$?.onChange}
    />
  )
}

export default ob(Extra)
