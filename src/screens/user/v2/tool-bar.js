/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:35:22
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable, Heatmap } from '@components'
import { Popover } from '@screens/_'
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
    <Flex style={[styles.container, !list && _.mb.md]} justify='center'>
      <Popover
        data={MODEL_COLLECTIONS_ORDERBY.data.map(item => item.label)}
        onSelect={$.onOrderSelect}
      >
        <Flex style={styles.item} justify='center'>
          <Iconfont
            name='sort'
            size={13}
            color={order ? _.colorMain : undefined}
          />
          <Text
            style={_.ml.xs}
            size={11}
            type={order ? 'main' : 'sub'}
            bold
            numberOfLines={1}
          >
            {order ? MODEL_COLLECTIONS_ORDERBY.getLabel(order) : '收藏时间'}
          </Text>
        </Flex>
        <Heatmap id='我的.筛选选择' />
      </Popover>
      <Popover data={filterData} onSelect={$.onFilterSelect}>
        <Flex style={styles.item} justify='center'>
          <Iconfont
            name='filter'
            size={13}
            color={tag ? _.colorMain : undefined}
          />
          <Text
            style={_.ml.xs}
            size={11}
            type={tag ? 'main' : 'sub'}
            bold
            numberOfLines={1}
          >
            {tag ? tag.replace(/ \(\d+\)/, '') : '标签'}
          </Text>
        </Flex>
        <Heatmap id='我的.排序选择' />
      </Popover>
      <Touchable onPress={$.toggleList}>
        <Flex style={styles.item} justify='center'>
          <Iconfont
            style={_.mr.xs}
            name='list'
            size={14}
            color={list ? _.colorMain : undefined}
          />
          <Iconfont
            style={_.ml.sm}
            name='order'
            size={13}
            color={!list ? _.colorMain : undefined}
          />
        </Flex>
        <Heatmap id='我的.布局选择' />
      </Touchable>
    </Flex>
  )
}

export default obc(ToolBar)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingTop: 12,
    backgroundColor: _.colorPlain
  },
  item: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    marginHorizontal: _.xs,
    backgroundColor: _.select(
      'rgba(238, 238, 238, 0.8)',
      _._colorDarkModeLevel1
    ),
    borderRadius: 16
  }
}))
