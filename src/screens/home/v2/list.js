/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 00:58:51
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_SETTING_HOME_LAYOUT, MODEL_SUBJECT_TYPE } from '@constants/model'
import Grid from './grid'
import Item from './item'
import { H_TABBAR, tabsWithGame as tabs } from './store'

const contentInset = IOS
  ? {
      top: _.headerHeight + H_TABBAR
    }
  : undefined
const contentOffset = IOS
  ? {
      y: -(_.headerHeight + H_TABBAR)
    }
  : undefined
const footerEmptyDataTextMap = {
  全部: '当前没有可管理的条目哦，请先添加一个条目',
  动画: '当前没有在追的番组哦',
  书籍: '当前没有在读的书籍哦',
  三次元: '当前没有在追的电视剧哦',
  游戏: '当前没有在玩的游戏哦'
}

function List({ title }, { $ }) {
  if (!$.userCollection._loaded) {
    return <Loading />
  }

  const isGrid = $.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')
  if (isGrid) {
    return <Grid title={title} />
  }

  const { page, isFocused } = $.state
  const index = $.tabs.findIndex(item => item.title === title)
  return (
    <ListView
      ref={ref => $.connectRef(ref, index)}
      style={!IOS && styles.androidWrap}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      data={$.currentUserCollection(title)}
      footerNoMoreDataText=''
      footerEmptyDataText={footerEmptyDataTextMap[title]}
      contentInset={contentInset}
      contentOffset={contentOffset}
      scrollToTop={isFocused && tabs[page].title === title}
      renderItem={renderItem}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={title === '游戏' ? $.onFooterRefresh : undefined}
    />
  )
}

export default obc(List, {
  title: '全部'
})

const styles = _.create({
  androidWrap: {
    marginBottom: _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingBottom: IOS ? _.bottom : _.bottom - _.tabBarHeight
  }
})

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
