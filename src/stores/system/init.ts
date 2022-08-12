/*
 * @Author: czy0729
 * @Date: 2019-07-13 14:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 07:32:30
 */
import {
  MODEL_SETTING_CDN_ORIGIN,
  MODEL_SETTING_HOME_GRID_COVER_LAYOUT,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_USER_GRID_NUM,
  VERSION_GITHUB_RELEASE
} from '@constants'
import { radiusMd } from '@styles'
import {
  SettingHomeGridCoverLayout,
  SettingHomeLayout,
  SettingHomeSorting
} from '@types'

export const NAMESPACE = 'System'

// -------------------- init --------------------
type LayoutValue = true | false | -1

/** 条目页面: true 显示 | false 折叠 | -1 永久隐藏 */
export const INIT_SUBJECT_LAYOUT = {
  /** 其他用户收藏数量 */
  showCount: true as LayoutValue,

  /** 进度输入框 */
  showEpInput: true as LayoutValue,

  /** 自定义放送时间块 */
  showCustomOnair: true as LayoutValue,

  /** 页面头部关系 */
  showRelation: true as LayoutValue,

  /** 本地目录信息 */
  showSMB: true as LayoutValue,

  /** 页面标签 */
  showTags: true as LayoutValue,

  /** 简介 */
  showSummary: true as LayoutValue,

  /** 简介 */
  showInfo: true as LayoutValue,

  /** 预览图 */
  showThumbs: true as LayoutValue,

  /** 游戏条目游戏更多信息 */
  showGameInfo: true as LayoutValue,

  /** 评分 */
  showRating: true as LayoutValue,

  /** 角色 */
  showCharacter: true as LayoutValue,

  /** 制作人员 */
  showStaff: true as LayoutValue,

  /** 关联 */
  showRelations: true as LayoutValue,

  /** 目录 */
  showCatalog: false as LayoutValue,

  /** 动态 */
  showRecent: false as LayoutValue,

  /** 日志 */
  showBlog: false as LayoutValue,

  /** 帖子 */
  showTopic: false as LayoutValue,

  /** 猜你喜欢 */
  showLike: false as LayoutValue,

  /** 吐槽 */
  showComment: true as LayoutValue
}

/** 发现页自定义菜单 */
export const INIT_DISCOVERY_MENU = [
  'Rank',
  'Anime',
  'Browser',
  'Catalog',
  'Calendar',
  'DiscoveryBlog',
  'Tags',
  'Open',
  'Staff',
  'Search',
  'Tinygrail',
  'Guess',
  'Wiki',
  'Yearbook',
  'UserTimeline',
  'Netabare',
  'Anitama',
  'Smb',
  'BilibiliSync',
  'Series',
  'Character',
  'Catalogs',
  'Link'
] as const

/** 默认设置 */
export const INIT_SETTING = {
  /** 简体转繁体 */
  s2t: false,

  /** 黑暗模式是否纯黑 */
  deepDark: true,

  /** 设置页面显示最基本的设置 */
  simple: true,

  /** 头像是否圆形 */
  avatarRound: false,

  /** 默认的封面圆角大小 */
  coverRadius: radiusMd,

  /** 使用 CDN 加速 */
  cdn: false,

  /** CDN 源头 */
  cdnOrigin: MODEL_SETTING_CDN_ORIGIN.getValue('jsDelivr'),

  /** 头像使用 CDN */
  cdnAvatar: true,

  /** 封面使用 CDN */
  cdnSubject: true,

  /** 帖子预加载使用 CDN */
  cdnRakuen: true,

  /** 是否中文优先 */
  cnFirst: true,

  /** 屏蔽敏感条目 */
  filter18x: false,

  /** 屏蔽默认头像用户相关信息 */
  filterDefault: false,

  /** @deprecated [已废弃] 扁平化 */
  flat: true,

  /** 章节热力图 */
  heatMap: true,

  /** 隐藏他人评分 */
  hideScore: false,

  /** 图片渐出 */
  imageTransition: false,

  /** @deprecated [已废弃] iOS风格弹出菜单 */
  iosMenu: false,

  /** @deprecated [已废弃] 首页收藏阴影 */
  itemShadow: false,

  /** 片假名终结者 */
  katakana: false,

  /** 点击水纹效果 (android) */
  ripple: false,

  /** Bangumi娘话语 */
  speech: true,

  /** 震动反馈 */
  vibration: false,

  /** 黑暗模式跟随系统 */
  autoColorScheme: false,

  /** 封面拟物 */
  coverThings: true,

  /** 首页显示游戏分类 */
  showGame: false,

  /** 是否开启小圣杯 */
  tinygrail: false,

  /** 小圣杯缩短资金数字显示 */
  xsbShort: true,

  /** 回复是否显示来源 */
  source: false,

  /** 用户空间网格个数 */
  userGridNum: MODEL_SETTING_USER_GRID_NUM.getValue('4'),

  /** 启动页 */
  initialPage: MODEL_SETTING_INITIAL_PAGE.getValue('进度'),

  /** @deprecated [已废弃] 图片质量 */
  quality: MODEL_SETTING_QUALITY.getValue('默认'),

  /** 切页动画 */
  transition: MODEL_SETTING_TRANSITION.getValue('水平'),

  /** 首页列表搜索框 */
  homeFilter: true,

  /** 首页条目显示搜索源头 */
  homeOrigin: false as LayoutValue,

  /** 首页已放送章节看完条目下沉 */
  homeSortSink: true,

  /** 首页Tabs项 */
  homeRenderTabs: ['Discovery', 'Timeline', 'Home', 'Rakuen', 'User'],

  /** 首页收藏布局 */
  homeLayout: MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>('列表'),

  /** 首页收藏网格布局时，条目封面形状 */
  homeGridCoverLayout:
    MODEL_SETTING_HOME_GRID_COVER_LAYOUT.getValue<SettingHomeGridCoverLayout>('正方形'),

  /** 首页收藏排序 */
  homeSorting: MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('APP'),

  /** 发现页自定义菜单 */
  discoveryMenu: [...INIT_DISCOVERY_MENU],

  /** 发现页今日放送 */
  discoveryTodayOnair: true,

  /** 发现菜单一列个数 */
  discoveryMenuNum: 5,

  /** 是否不使用字体 */
  customFontFamily: false,

  /** 条目页面布局 */
  ...INIT_SUBJECT_LAYOUT
}

export const INIT_DEV_EVENT = {
  enabled: false,
  grid: true,
  text: true,
  sum: false,
  mini: false
}

export const INIT_RELEASE = {
  name: VERSION_GITHUB_RELEASE,
  downloadUrl: ''
}

export const INIT_IMAGE_VIEWER = {
  visible: false,
  imageUrls: [],
  index: 0
}
