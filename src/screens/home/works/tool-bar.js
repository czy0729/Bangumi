/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 01:50:31
 */
import React from 'react'
import { Iconfont, ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_MONO_WORKS_ORDERBY } from '@constants/model'

const orderData = MODEL_MONO_WORKS_ORDERBY.data.map(item => item.label)

function ToolBar(props, { $ }) {
  const { order, position, list } = $.state
  const { filters } = $.monoWorks
  const orderLabel = MODEL_MONO_WORKS_ORDERBY.getLabel(order)
  return (
    <CompToolBar style={!list && _.mb.sm}>
      <CompToolBar.Popover
        data={orderData}
        icon='sort'
        iconColor={orderLabel !== '名称' ? _.colorMain : undefined}
        text={orderLabel}
        type={orderLabel !== '名称' ? 'main' : 'sub'}
        heatmap='作品.排序选择'
        onSelect={$.onOrderSelect}
      />
      {filters.map(item => {
        const data = item.data.map(i => i.title)
        const find = item.data.find(i => i.value === position) || {
          title: '全部'
        }
        return (
          <CompToolBar.Popover
            key={item.title}
            data={data}
            text={find.title === '全部' ? item.title : find.title || item.title}
            type={find.title !== '全部' ? 'main' : 'sub'}
            heatmap='作品.职位选择'
            onSelect={label => $.onFilterSelect(label, item.data)}
          />
        )
      })}
      <CompToolBar.Touchable heatmap='作品.切换布局' onSelect={$.toggleList}>
        <Iconfont
          style={_.mr.xs}
          name='list'
          size={14}
          color={list ? _.colorMain : _.colorDesc}
        />
        <Iconfont
          style={_.ml.sm}
          name='order'
          size={13}
          color={!list ? _.colorMain : _.colorDesc}
        />
      </CompToolBar.Touchable>
    </CompToolBar>
  )
}

export default obc(ToolBar)
