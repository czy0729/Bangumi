/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 11:59:21
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DATA_BROWSER_AIRTIME, DATA_BROWSER_MONTH } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const typeData = MODEL_SUBJECT_TYPE.data.map(item => item.title)

function ToolBar(props, { $ }) {
  const { type, airtime, month } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
  return (
    <CompToolBar style={!$.isList && _.mb.sm}>
      <CompToolBar.Popover
        data={typeData}
        icon='md-filter-list'
        iconColor={_.colorMain}
        text={typeCn}
        type='main'
        heatmap='索引.类型选择'
        onSelect={$.onTypeSelect}
      />
      <CompToolBar.Icon icon='md-arrow-back' onSelect={$.onAirdatePrev} />
      <CompToolBar.Popover
        data={DATA_BROWSER_AIRTIME}
        text={`${airtime}年` || '年'}
        heatmap='索引.年选择'
        onSelect={$.onAirdateSelect}
      />
      <CompToolBar.Popover
        data={DATA_BROWSER_MONTH}
        text={`${month}月` || '月'}
        heatmap='索引.月选择'
        onSelect={$.onMonthSelect}
      />
      <CompToolBar.Icon icon='md-arrow-forward' onSelect={$.onAirdateNext} />
    </CompToolBar>
  )
}

export default obc(ToolBar)
