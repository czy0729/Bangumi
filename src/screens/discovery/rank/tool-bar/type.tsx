/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 13:23:34
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'

function Type(props, { $ }) {
  const { type } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
  return (
    <ToolBar.Popover
      data={MODEL_SUBJECT_TYPE.data.map(item => item.title)}
      icon='md-filter-list'
      iconColor={_.colorDesc}
      text={typeCn}
      type='desc'
      heatmap='排行榜.类型选择'
      onSelect={$.onTypeSelect}
    />
  )
}

export default obc(Type)
