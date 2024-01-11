/*
 * @Author: czy0729
 * @Date: 2022-06-04 06:22:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:57:55
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE, SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'

function Filter(props, { $ }: Ctx) {
  const { type } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  return (
    <ToolBar.Popover
      data={SUBJECT_TYPE.map(item => item.title)}
      icon='md-filter-list'
      iconColor={_.colorDesc}
      text={typeCn}
      type='desc'
      heatmap='索引.类型选择'
      onSelect={$.onTypeSelect}
    />
  )
}

export default obc(Filter)
