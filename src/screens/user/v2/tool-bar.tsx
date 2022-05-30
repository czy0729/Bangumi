/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 10:16:50
 */
import React from 'react'
import { View } from 'react-native'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS, MODEL_COLLECTIONS_ORDERBY } from '@constants/model'
import { defaultSubjectType, defaultOrder, tabs } from './store'
import Filter from './filter'

const defaultProps = {
  styles: {},
  colorMain: _.colorMain,
  colorDesc: _.colorDesc,
  page: 0,
  fixed: false,
  list: true,
  order: defaultOrder,
  tag: '',
  userCollectionsTags: [],
  showFilter: false,
  onOrderSelect: Function.prototype,
  onTagSelect: Function.prototype,
  onToggleList: Function.prototype,
  onToggleFixed: Function.prototype,
  onToggleFilter: Function.prototype
}

const ToolBar = memo(
  ({
    styles,
    colorMain,
    colorDesc,
    page,
    fixed,
    list,
    order,
    tag,
    userCollectionsTags,
    showFilter,
    onOrderSelect,
    onTagSelect,
    onToggleList,
    onToggleFixed,
    onToggleFilter
  }) => {
    global.rerender('User.ToolBar.Main')

    const filterData = ['重置']
    userCollectionsTags.forEach(item => filterData.push(`${item.tag} (${item.count})`))
    return (
      <View style={[styles.container, !list && _.mb.md]}>
        <CompToolBar>
          <CompToolBar.Popover
            data={MODEL_COLLECTIONS_ORDERBY.data.map(item => item.label)}
            icon='md-sort'
            iconColor={colorDesc}
            text={order ? MODEL_COLLECTIONS_ORDERBY.getLabel(order) : '收藏时间'}
            type='desc'
            heatmap='我的.筛选选择'
            onSelect={onOrderSelect}
          />
          <CompToolBar.Popover
            data={filterData}
            icon='md-bookmark-outline'
            iconColor={colorDesc}
            text={tag ? tag.replace(/ \(\d+\)/, '') : '标签'}
            type='desc'
            heatmap='我的.排序选择'
            onSelect={onTagSelect}
          />
          <CompToolBar.Icon
            icon='md-search'
            iconColor={showFilter ? colorMain : colorDesc}
            onSelect={onToggleFilter}
          />
          <CompToolBar.Popover
            data={[
              `工具栏 · ${fixed ? '固定' : '浮动'}`,
              `布　局 · ${list ? '列表' : '网格'}`
            ]}
            icon='md-more-vert'
            iconColor={_.colorDesc}
            iconSize={20}
            type='desc'
            transparent
            onSelect={title => {
              if (title.includes('布　局')) {
                onToggleList()
              } else if (title.includes('工具栏')) {
                onToggleFixed()
              }
            }}
          />
        </CompToolBar>
        <Filter page={page} />
      </View>
    )
  },
  defaultProps,
  ({ userCollectionsTags, ...other }) => ({
    ...other,
    userCollectionsTags: userCollectionsTags.length
  })
)

export default obc(({ page, onToggleList }, { $ }) => {
  global.rerender('User.ToolBar')

  const {
    subjectType = defaultSubjectType,
    fixed,
    list,
    order,
    tag,
    showFilter
  } = $.state
  const type = MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
  return (
    <ToolBar
      styles={memoStyles()}
      colorMain={_.colorMain}
      colorDesc={_.colorDesc}
      page={page}
      fixed={fixed}
      list={list}
      order={order}
      tag={tag}
      userCollectionsTags={$.userCollectionsTags(subjectType, type)}
      showFilter={showFilter}
      onOrderSelect={$.onOrderSelect}
      onTagSelect={$.onTagSelect}
      onToggleList={() => {
        onToggleList()
        $.onToggleList()
      }}
      onToggleFixed={$.onToggleFixed}
      onToggleFilter={$.onToggleFilter}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.md - 2,
    backgroundColor: _.colorPlain
  }
}))
