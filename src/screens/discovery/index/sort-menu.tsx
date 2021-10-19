/*
 * @Author: czy0729
 * @Date: 2021-10-18 11:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-18 12:06:13
 */
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { DraggableGrid } from 'react-native-draggable-grid'

const menus = [
  {
    name: '排行榜',
    icon: 'md-equalizer',
    key: 'Rank'
  },
  {
    name: '找条目',
    icon: 'md-live-tv',
    key: 'Anime'
  },
  {
    name: '索引',
    icon: 'md-data-usage',
    key: 'Browser'
  },
  {
    name: '目录',
    icon: 'md-folder-open',
    key: 'Catalog'
  },
  {
    name: '每日放送',
    icon: 'md-calendar-today',
    key: 'Calendar'
  },
  // {
  //   name: '游戏',
  //   icon: 'md-videogame-asset',
  //   key: 'Game'
  // },
  // {
  //   name: '漫画',
  //   icon: 'md-chrome-reader-mode',
  //   key: 'Manga'
  // },
  {
    name: '日志',
    icon: 'md-edit',
    key: 'DiscoveryBlog'
  },
  {
    name: '标签',
    icon: 'md-bookmark-outline',
    key: 'Tags'
  },
  {
    name: '更多',
    icon: 'md-more-horiz',
    key: 'open'
  },
  // {
  //   name: '文库',
  //   icon: 'md-notes',
  //   key: 'Wenku'
  // },
  {
    name: '新番',
    icon: 'md-local-play',
    key: 'Staff'
  },
  {
    name: '搜索',
    icon: 'md-search',
    key: 'Search'
  },
  {
    name: '小圣杯',
    icon: 'trophy',
    key: 'Tinygrail'
  },
  {
    name: '推荐',
    icon: 'md-favorite-outline',
    key: 'Guess',
    login: true
  },
  {
    name: '维基人',
    icon: 'wiki',
    key: 'Wiki'
  },
  {
    name: '年鉴',
    icon: 'md-whatshot',
    key: 'Yearbook'
  },
  {
    name: '时间线',
    icon: 'md-timeline',
    key: 'UserTimeline',
    login: true
  },
  {
    name: 'netaba.re',
    icon: 'md-trending-up',
    key: 'netabare'
  },
  {
    name: 'anitama',
    icon: 'md-text-format',
    key: 'Anitama'
  },
  // {
  //   name: '好友',
  //   icon: 'md-face',
  //   key: 'Friends',
  //   login: true
  // },
  {
    name: '我的人物',
    icon: 'md-folder-shared',
    key: 'Character',
    login: true
  },
  {
    name: '我的目录',
    icon: 'md-folder-special',
    key: 'Catalogs',
    login: true
  },
  {
    name: '剪贴板',
    icon: 'md-link',
    key: 'Link'
  },
  {
    name: '收起',
    icon: 'md-expand',
    key: 'close'
  }
]

function SortMenu() {
  return (
    <View>
      <DraggableGrid
        data={menus}
        numColumns={4}
        renderItem={(item: { name: string; key: string }) => (
          <View style={styles.item} key={item.key}>
            <Text style={styles.item_text}>{item.name}</Text>
          </View>
        )}
        onDragRelease={data => {
          // this.setState({ data }) // need reset the props data sort after drag release
        }}
      />
    </View>
  )
}

export default SortMenu

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 100,
    backgroundColor: 'blue'
  },
  wrapper: {
    paddingTop: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  item: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item_text: {
    fontSize: 40,
    color: '#FFFFFF'
  }
})
