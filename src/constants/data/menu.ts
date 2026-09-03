/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:10:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:10:47
 *
 * 发现页菜单
 */
import type { MenuMap } from '@types'

/** 发现页菜单 */
export const MENU_MAP: MenuMap = {
  /* ==================== 默认显示菜单项 (第 1 行) ==================== */
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
  Calendar: {
    key: 'Calendar',
    name: '每日放送',
    icon: 'md-calendar-today',
    size: 20
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

  /* ==================== 默认显示菜单项 (第 2 行) ==================== */
  Staff: {
    key: 'Staff',
    name: '新番',
    icon: 'md-local-play'
  },
  Tags: {
    key: 'Tags',
    name: '标签',
    icon: 'md-bookmark-outline'
  },
  Dollars: {
    key: 'Dollars',
    name: 'Dollars',
    text: 'D',
    size: 21,
    login: true
  },
  DiscoveryBlog: {
    key: 'DiscoveryBlog',
    name: '日志',
    icon: 'md-edit',
    size: 21
  },
  Open: {
    key: 'Open',
    name: '自定义',
    icon: 'md-more-horiz'
  },

  /* ==================== 默认隐藏菜单项 (第 3 行) ==================== */
  Search: {
    key: 'Search',
    name: '搜索',
    icon: 'md-search',
    web: false
  },
  Like: {
    key: 'Like',
    name: '猜你喜欢',
    icon: 'md-looks'
  },
  Anitama: {
    key: 'Anitama',
    name: '资讯',
    icon: 'md-text-format',
    size: 26,
    web: false
  },
  Series: {
    key: 'Series',
    name: '关联系列',
    icon: 'md-workspaces-outline',
    login: true
  },
  DiscoveryUsers: {
    key: 'DiscoveryUsers',
    name: '社区项目',
    icon: 'md-whatshot'
  },

  /* ==================== 默认隐藏菜单项 (第 4 行) ==================== */
  Tinygrail: {
    key: 'Tinygrail',
    name: '小圣杯',
    icon: 'trophy',
    size: 20,
    web: false
  },
  Milestone: {
    key: 'Milestone',
    name: '照片墙',
    icon: 'md-image-aspect-ratio'
  },
  WordCloud: {
    key: 'WordCloud',
    name: '我的词云',
    login: true
  },
  UserTimeline: {
    key: 'UserTimeline',
    name: '时间线',
    icon: 'md-timeline',
    login: true
  },
  Wiki: {
    key: 'Wiki',
    name: '维基人'
  },

  /* ==================== 默认隐藏菜单项 (第 5 行) ==================== */
  Yearbook: {
    key: 'Yearbook',
    name: '年鉴',
    web: false
  },
  BilibiliSync: {
    key: 'BilibiliSync',
    name: 'bilibili 同步',
    web: false
  },
  DoubanSync: {
    key: 'DoubanSync',
    name: '豆瓣同步',
    web: false
  },
  Backup: {
    key: 'Backup',
    name: '本地备份',
    icon: 'md-inbox',
    size: 22,
    login: true,
    web: false
  },
  Smb: {
    key: 'Smb',
    name: '本地管理'
  },

  /* ==================== 默认隐藏菜单项 (第 6 行) ==================== */
  Character: {
    key: 'Character',
    name: '我的人物',
    icon: ['md-folder', 'md-favorite'],
    login: true
  },
  Catalogs: {
    key: 'Catalogs',
    name: '我的目录',
    icon: 'md-folder-special',
    login: true
  },
  Blogs: {
    key: 'Blogs',
    name: '我的日志',
    icon: ['md-folder', 'md-edit'],
    login: true
  },
  Friends: {
    key: 'Friends',
    name: '我的好友',
    icon: 'md-folder-shared',
    login: true
  },
  Link: {
    key: 'Link',
    name: '剪贴板',
    icon: 'md-link',
    web: false
  }
} as const

/** 发现页菜单映射 (WEB) */

export const MENU_MAP_STORYBOOK: MenuMap = {
  Setting: {
    key: 'Setting',
    name: '设置',
    icon: 'setting'
  }
  // LoginToken: {
  //   key: 'LoginToken',
  //   name: '授权',
  //   icon: 'md-face'
  // }
}
