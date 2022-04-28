/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 13:34:19
 */
import React from 'react'
import { Iconfont, ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DATA_AIRTIME, DATA_MONTH } from '@constants'
import { MODEL_TAG_ORDERBY } from '@constants/model'

const orderData = MODEL_TAG_ORDERBY.data.map(item => item.label)

function ToolBar(props, { $ }) {
  const { order, list, airtime, month, hideCollected } = $.state
  return (
    <CompToolBar style={!list && _.mb.sm}>
      <CompToolBar.Popover
        data={orderData}
        icon='md-sort'
        iconColor={order ? _.colorMain : _.colorDesc}
        iconSize={17}
        text={order ? MODEL_TAG_ORDERBY.getLabel(order) : '名称'}
        type={order ? 'main' : 'desc'}
        heatmap='用户标签.排序选择'
        onSelect={$.onOrderSelect}
      />
      <CompToolBar.Popover
        data={DATA_AIRTIME}
        text={airtime || '年'}
        type={airtime === '' ? 'desc' : 'main'}
        heatmap='用户标签.年选择'
        onSelect={$.onAirdateSelect}
      />
      <CompToolBar.Popover
        data={DATA_MONTH}
        text={month || '月'}
        type={month === '' ? 'desc' : 'main'}
        heatmap='用户标签.月选择'
        onSelect={$.onMonthSelect}
      />
      <CompToolBar.Touchable heatmap='用户标签.切换布局' onSelect={$.toggleList}>
        <Iconfont
          style={_.mr.xs}
          name='md-menu'
          size={17}
          color={list ? _.colorMain : _.colorDesc}
        />
        <Iconfont
          style={_.ml.xs}
          name='md-grid-view'
          size={15}
          color={!list ? _.colorMain : _.colorDesc}
        />
      </CompToolBar.Touchable>
      <CompToolBar.Popover
        data={[`隐藏已收藏${hideCollected ? ' √' : ''}`]}
        icon='md-filter-list'
        iconColor={hideCollected ? _.colorMain : _.colorDesc}
        iconSize={16}
        text={hideCollected ? 1 : ''}
        type={hideCollected ? 'main' : 'desc'}
        onSelect={$.onFilterSelect}
      />
    </CompToolBar>
  )
}

export default obc(ToolBar)
