/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-31 21:43:37
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc, memo } from '@utils/decorators'
import { LIST_EMPTY, IOS } from '@constants'
import { MODEL_SETTING_HOME_LAYOUT, MODEL_SUBJECT_TYPE } from '@constants/model'
import Filter from './filter'
import Grid from './grid'
import Item from './item'
import Empty from './empty'
import { OFFSET_LISTVIEW, tabsWithGame as tabs } from './store'

const contentInset = IOS
  ? {
      top: OFFSET_LISTVIEW
    }
  : undefined
const contentOffset = IOS
  ? {
      y: -OFFSET_LISTVIEW
    }
  : undefined
const defaultProps = {
  styles: {},
  connectRef: Function.prototype,
  data: LIST_EMPTY,
  title: '',
  scrollToTop: false,
  onHeaderRefresh: Function.prototype,
  onFooterRefresh: undefined
}

const List = memo(
  ({
    styles,
    connectRef,
    data,
    title,
    scrollToTop,
    onHeaderRefresh,
    onFooterRefresh
  }) => {
    rerender('Home.List.Main')

    const emptyComponent = <Empty title={title} length={data.list.length} />
    return (
      <ListView
        ref={connectRef}
        style={!IOS && styles.androidWrap}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={data}
        ListHeaderComponent={<Filter />}
        footerNoMoreDataText=''
        footerEmptyDataComponent={emptyComponent}
        footerNoMoreDataComponent={emptyComponent}
        contentInset={contentInset}
        contentOffset={contentOffset}
        scrollToTop={scrollToTop}
        renderItem={renderItem}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
      />
    )
  },
  defaultProps
)

export default obc(({ title = '全部' }, { $ }) => {
  rerender('Home.List')

  if (!$.userCollection._loaded) return <Loading />

  const isGrid = $.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')
  if (isGrid) return <Grid title={title} />

  const styles = memoStyles()
  const { page, isFocused } = $.state
  const index = $.tabs.findIndex(item => item.title === title)
  return (
    <List
      connectRef={ref => $.connectRef(ref, index)}
      styles={styles}
      style={IOS ? undefined : styles.androidWrap}
      data={$.currentUserCollection(title)}
      title={title}
      scrollToTop={isFocused && tabs[page].title === title}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={title === '游戏' ? $.onFooterRefresh : undefined}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  androidWrap: {
    marginBottom: _.tabBarHeight - 1,
    backgroundColor: _.colorBg
  },
  contentContainerStyle: {
    paddingBottom: IOS ? _.bottom : _.bottom - _.tabBarHeight
  }
}))

function keyExtractor(item) {
  return String(item.subject_id || item.id)
}

function renderItem({ item, index }) {
  // 游戏标签页和其他类型数据源和结构都不一样, 需要构造
  return (
    <Item
      index={index}
      subjectId={item.subject_id || item.id}
      subject={
        item.subject || {
          id: item.id,
          images: {
            common: item.cover,
            grid: item.cover,
            large: item.cover,
            medium: item.cover,
            small: item.cover
          },
          name: item.name,
          name_cn: item.nameCn,
          summary: '',
          type: MODEL_SUBJECT_TYPE.getValue('游戏'),
          url: ''
        }
      }
      epStatus={item.ep_status}
    />
  )
}
