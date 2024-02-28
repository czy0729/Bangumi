/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-22 15:52:24
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE, SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'

function Type(props, { $ }: Ctx) {
  const { type } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  return (
    <ToolBar.Popover
      data={SUBJECT_TYPE.map(item => item.title)}
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
