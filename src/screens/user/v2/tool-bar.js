/* eslint-disable no-unreachable */
/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-24 14:44:49
 */
import React from 'react'
import { Iconfont, ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import {
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY
} from '@constants/model'
import { tabs } from './store'

function ToolBar(props, { $ }) {
  const styles = memoStyles()
  const { subjectType, list, order, tag, page } = $.state
  const type = MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
  const userCollectionsTags = $.userCollectionsTags(subjectType, type)
  const filterData = ['重置']
  userCollectionsTags.forEach(item =>
    filterData.push(`${item.tag} (${item.count})`)
  )

  return (
    <CompToolBar style={[styles.container, !list && _.mb.md]}>
      <CompToolBar.Popover
        data={MODEL_COLLECTIONS_ORDERBY.data.map(item => item.label)}
        icon='md-sort'
        iconColor={order ? _.colorMain : undefined}
        text={order ? MODEL_COLLECTIONS_ORDERBY.getLabel(order) : '收藏时间'}
        type={order ? 'main' : 'sub'}
        heatmap='我的.筛选选择'
        onSelect={$.onOrderSelect}
      />
      <CompToolBar.Popover
        data={filterData}
        icon='md-bookmark-outline'
        iconColor={tag ? _.colorMain : undefined}
        text={tag ? tag.replace(/ \(\d+\)/, '') : '标签'}
        type={tag ? 'main' : 'sub'}
        heatmap='我的.排序选择'
        onSelect={$.onFilterSelect}
      />
      <CompToolBar.Touchable heatmap='我的.布局选择' onSelect={$.toggleList}>
        <Iconfont
          style={_.mr.xs}
          name='md-menu'
          size={16}
          color={list ? _.colorMain : undefined}
        />
        <Iconfont
          style={_.ml.xs}
          name='md-grid-view'
          size={16}
          color={!list ? _.colorMain : undefined}
        />
      </CompToolBar.Touchable>
    </CompToolBar>
  )
}

export default obc(ToolBar)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingTop: 12,
    backgroundColor: _.colorPlain
  }
}))
