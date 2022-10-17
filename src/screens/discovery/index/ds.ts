/*
 * @Author: czy0729
 * @Date: 2021-07-16 14:21:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-17 18:01:17
 */
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import { IOS, SUBJECT_TYPE } from '@constants'
import { MenuItemType } from './types'

export const NAMESPACE = 'ScreenDiscovery'

export const EXCLUDE_STATE = {
  home: {
    list: SUBJECT_TYPE.map(item => ({
      type: item.label
    })),
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _loaded: getTimestamp()
  },
  visible: false,
  dragging: false,
  expand: false,
  link: ''
}

export const STATE = {
  showBlockTrain: true,
  ...EXCLUDE_STATE,
  _loaded: true
}

export const INITIAL_RENDER_NUMS_XS = _.device(
  Math.floor(_.window.contentWidth / 80) + 1,
  0
)

const MENU_MAP = {
  Rank: {
    key: 'Rank',
    name: '排行榜',
    icon: 'md-equalizer'
  },
  Anime: {
    key: 'Anime',
    name: '找条目',
    icon: 'md-live-tv',
    size: 21
  },
  Browser: {
    key: 'Browser',
    name: '索引',
    icon: 'md-data-usage'
  },
  Catalog: {
    key: 'Catalog',
    name: '目录',
    icon: 'md-folder-open'
  },
  Calendar: {
    key: 'Calendar',
    name: '每日放送',
    icon: 'md-calendar-today',
    size: 20
  },
  DiscoveryBlog: {
    key: 'DiscoveryBlog',
    name: '日志',
    icon: 'md-edit',
    size: 21
  },
  Tags: {
    key: 'Tags',
    name: '标签',
    icon: 'md-bookmark-outline'
  },
  Open: {
    key: 'Open',
    name: '自定义',
    icon: 'md-more-horiz'
  },
  Staff: {
    key: 'Staff',
    name: '新番',
    icon: 'md-local-play'
  },
  Search: {
    key: 'Search',
    name: '搜索',
    icon: 'md-search'
  },
  Tinygrail: {
    key: 'Tinygrail',
    name: '小圣杯',
    icon: 'trophy',
    size: 20
  },
  // Guess: {
  //   key: 'Guess',
  //   name: '推荐',
  //   icon: 'md-favorite-outline',
  //   login: true
  // },
  Wiki: {
    key: 'Wiki',
    name: '维基人',
    text: 'wiki',
    size: 14
  },
  Yearbook: {
    key: 'Yearbook',
    name: '年鉴',
    icon: 'md-whatshot'
  },
  UserTimeline: {
    key: 'UserTimeline',
    name: '时间线',
    icon: 'md-timeline',
    login: true
  },
  Netabare: {
    key: 'Netabare',
    name: 'netaba.re',
    text: 'N',
    size: 18
  },
  Anitama: {
    key: 'Anitama',
    name: '资讯',
    icon: 'md-text-format',
    size: 26
  },
  Smb: {
    key: 'Smb',
    name: '本地管理',
    text: 'SMB',
    size: 14,
    ios: false
  },
  DoubanSync: {
    key: 'DoubanSync',
    name: '豆瓣同步',
    text: 'D',
    size: 18
  },
  BilibiliSync: {
    key: 'BilibiliSync',
    name: 'bilibili 同步',
    text: 'B',
    size: 20
  },
  Series: {
    key: 'Series',
    name: '关联系列',
    icon: 'md-workspaces-outline',
    login: true
  },
  Character: {
    key: 'Character',
    name: '我的人物',
    icon: 'md-folder-shared',
    login: true
  },
  Catalogs: {
    key: 'Catalogs',
    name: '我的目录',
    icon: 'md-folder-special',
    login: true
  },
  Link: {
    key: 'Link',
    name: '剪贴板',
    icon: 'md-link'
  }
} as const

export type MenuMapType = keyof typeof MENU_MAP

/** 根据设置自定义菜单构造菜单数据 */
export function getMenus(discoveryMenu: MenuMapType[] = []): MenuItemType[] {
  if (!discoveryMenu.length) return []

  const menuMap = { ...MENU_MAP }

  // 若 discoveryMenu 的 key 不存在在 defaultMenu 里, 需要过滤
  let menus = []
  discoveryMenu.forEach(key => {
    if (menuMap[key]) {
      menus.push(menuMap[key])
      delete menuMap[key]
    }
  })

  // 若有新菜单, 在 key=Open 前插入
  const newMenuKeys = Object.keys(menuMap)
  if (newMenuKeys.length) {
    const openIndex = menus.findIndex(item => item.key === 'Open')
    const newMenus = newMenuKeys.map(item => menuMap[item])
    menus = [
      ...menus.slice(0, openIndex),
      ...newMenus,
      ...menus.slice(openIndex, menus.length)
    ]
  }

  if (IOS) return menus.filter(item => item.ios !== false)

  return menus
}

export const linearColor = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.4)',
  'rgba(0, 0, 0, 0.82)'
] as const
