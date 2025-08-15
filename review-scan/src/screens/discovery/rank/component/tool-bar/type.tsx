/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:54:26
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SUBJECT_TYPE } from '@constants'
import { Ctx } from '../../types'

const DATA = SUBJECT_TYPE.map(item => item.title)

/** 类型 */
function Type() {
  const { $ } = useStore<Ctx>()
  return (
    <ToolBar.Popover
      data={DATA}
      icon='md-filter-list'
      iconColor={_.colorDesc}
      text={$.typeCn}
      type='desc'
      onSelect={$.onTypeSelect}
      heatmap='排行榜.类型选择'
    />
  )
}

export default ob(Type)
