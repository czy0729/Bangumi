/*
 * @Author: czy0729
 * @Date: 2019-10-02 02:57:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-30 11:57:56
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Btn from './btn'

const menus = [
  {
    title: '排行榜',
    icon: 'md-equalizer',
    path: 'Rank'
  },
  {
    title: '找条目',
    icon: 'md-live-tv',
    path: 'Anime'
  },
  {
    title: '索引',
    icon: 'md-data-usage',
    path: 'Browser'
  },
  {
    title: '目录',
    icon: 'md-folder-open',
    path: 'Catalog'
  },
  {
    title: '每日放送',
    icon: 'md-calendar-today',
    path: 'Calendar'
  },
  // {
  //   title: '游戏',
  //   icon: 'md-videogame-asset',
  //   path: 'Game'
  // },
  // {
  //   title: '漫画',
  //   icon: 'md-chrome-reader-mode',
  //   path: 'Manga'
  // },
  {
    title: '日志',
    icon: 'md-edit',
    path: 'DiscoveryBlog'
  },
  {
    title: '标签',
    icon: 'md-bookmark-outline',
    path: 'Tags'
  },
  {
    title: '更多',
    icon: 'md-more-horiz',
    path: 'open'
  },
  // {
  //   title: '文库',
  //   icon: 'md-notes',
  //   path: 'Wenku'
  // },
  {
    title: '档期',
    icon: 'md-local-play',
    path: 'Staff'
  },
  {
    title: '搜索',
    icon: 'md-search',
    path: 'Search'
  },
  {
    title: '小圣杯',
    icon: 'trophy',
    path: 'Tinygrail'
  },
  {
    title: '推荐',
    icon: 'md-favorite-outline',
    path: 'Guess',
    login: true
  },
  {
    title: '趋势',
    icon: 'md-trending-up',
    path: 'netabare',
    login: true
  },
  {
    title: '维基人',
    icon: 'wiki',
    path: 'Wiki'
  },
  {
    title: '好友',
    icon: 'md-face',
    path: 'Friends',
    login: true
  },
  {
    title: 'Anitama',
    icon: 'md-text-format',
    path: 'Anitama'
  },
  {
    title: '时间线',
    icon: 'md-timeline',
    path: 'UserTimeline',
    login: true
  },
  {
    title: '我的人物',
    icon: 'md-folder-shared',
    path: 'Character',
    login: true
  },
  {
    title: '我的目录',
    icon: 'md-folder-special',
    path: 'Catalogs',
    login: true
  },
  {
    title: '剪贴板',
    icon: 'md-link',
    path: 'Link'
  },
  {
    title: '收起',
    icon: 'md-expand',
    path: 'close'
  }
]

function Menu(props, { $ }) {
  const { expand } = $.state
  return (
    <Flex style={styles.container} wrap='wrap'>
      {menus
        .filter(
          (item, index) =>
            item.path !== (expand ? 'open' : 'close') &&
            index <= (expand ? 100 : 7)
        )
        .map(item => (
          <Btn key={item.path} item={item} />
        ))}
    </Flex>
  )
}

export default obc(Menu)

const styles = _.create({
  container: {
    paddingHorizontal: _.wind,
    marginTop: _.sm
  }
})
