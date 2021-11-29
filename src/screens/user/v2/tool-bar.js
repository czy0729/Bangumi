/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-28 09:38:34
 */
import React from 'react'
import { Iconfont, ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS, MODEL_COLLECTIONS_ORDERBY } from '@constants/model'
import { defaultSubjectType, defaultOrder, tabs } from './store'
import Filter from './filter'

const defaultProps = {
  styles: {},
  colorMain: _.colorMain,
  list: true,
  order: defaultOrder,
  tag: '',
  userCollectionsTags: [],
  showFilter: false,
  onOrderSelect: Function.prototype,
  onFilterSelect: Function.prototype,
  onToggleList: Function.prototype,
  onToggleFilter: Function.prototype
}

const ToolBar = memo(
  ({
    styles,
    colorMain,
    list,
    order,
    tag,
    userCollectionsTags,
    showFilter,
    onOrderSelect,
    onFilterSelect,
    onToggleList,
    onToggleFilter
  }) => {
    rerender('User.ToolBar.Main')

    const filterData = ['重置']
    userCollectionsTags.forEach(item => filterData.push(`${item.tag} (${item.count})`))
    return (
      <>
        <CompToolBar style={[styles.container, !list && _.mb.md]}>
          <CompToolBar.Popover
            data={MODEL_COLLECTIONS_ORDERBY.data.map(item => item.label)}
            icon='md-sort'
            iconColor={order ? colorMain : undefined}
            text={order ? MODEL_COLLECTIONS_ORDERBY.getLabel(order) : '收藏时间'}
            type={order ? 'main' : 'sub'}
            heatmap='我的.筛选选择'
            onSelect={onOrderSelect}
          />
          <CompToolBar.Popover
            data={filterData}
            icon='md-bookmark-outline'
            iconColor={tag ? colorMain : undefined}
            text={tag ? tag.replace(/ \(\d+\)/, '') : '标签'}
            type={tag ? 'main' : 'sub'}
            heatmap='我的.排序选择'
            onSelect={onFilterSelect}
          />
          <CompToolBar.Touchable heatmap='我的.布局选择' onSelect={onToggleList}>
            <Iconfont
              style={_.mr.xs}
              name='md-menu'
              size={17}
              color={list ? colorMain : undefined}
            />
            <Iconfont
              style={_.ml.xs}
              name='md-grid-view'
              size={15}
              color={!list ? colorMain : undefined}
            />
          </CompToolBar.Touchable>
          <CompToolBar.Icon
            style={styles.search}
            icon='md-search'
            iconColor={showFilter ? _.colorMain : undefined}
            onSelect={onToggleFilter}
          />
        </CompToolBar>
        {showFilter && <Filter />}
      </>
    )
  },
  defaultProps,
  ({ userCollectionsTags, ...other }) => ({
    ...other,
    userCollectionsTags: userCollectionsTags.length
  })
)

export default obc(({ onToggleList }, { $ }) => {
  rerender('User.ToolBar')

  const {
    subjectType = defaultSubjectType,
    list,
    order,
    tag,
    page,
    showFilter
  } = $.state
  const type = MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
  return (
    <ToolBar
      styles={memoStyles()}
      colorMain={_.colorMain}
      list={list}
      order={order}
      tag={tag}
      userCollectionsTags={$.userCollectionsTags(subjectType, type)}
      showFilter={showFilter}
      onOrderSelect={$.onOrderSelect}
      onFilterSelect={$.onFilterSelect}
      onToggleList={() => {
        onToggleList()
        $.toggleList()
      }}
      onToggleFilter={$.onToggleFilter}
    />
  )
})

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingTop: _.md,
    backgroundColor: _.colorPlain
  }
}))
