/*
 * @Author: czy0729
 * @Date: 2019-07-13 14:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-21 05:53:27
 */
import { VERSION_GITHUB_RELEASE } from '@constants'
import {
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_USER_GRID_NUM,
  MODEL_SETTING_CDN_ORIGIN
} from '@constants/model'
import { radiusMd } from '@styles'

export const NAMESPACE = 'System'

// -------------------- init --------------------
/**
 * 条目页面
 * true 显示 | false 折叠 | -1 永久隐藏
 */
export const INIT_SUBJECT_LAYOUT = {
  // 功能块
  showCount: true, // 其他用户收藏数量
  showEpInput: true, // 进度输入框
  showCustomOnair: true, // 自定义放送时间块

  // 布局
  showRelation: true, // 页面头部关系
  showSMB: true, // 本地目录信息
  showTags: true, // 页面标签
  showSummary: true, // 简介
  showInfo: true, // 简介
  showThumbs: true, // 预览图
  showGameInfo: true, // 游戏条目游戏更多信息
  showRating: true, // 评分
  showCharacter: true, // 角色
  showStaff: true, // 制作人员
  showRelations: true, // 关联
  showCatalog: false, // 目录
  showRecent: false, // 动态
  showBlog: false, // 日志
  showTopic: false, // 帖子
  showLike: false, // 猜你喜欢
  showComment: true // 吐槽
}

export const INIT_SETTING = {
  s2t: false, // 简体转繁体
  deepDark: true, // 黑暗模式是否纯黑
  simple: true, // 设置页面显示最基本的设置
  avatarRound: false, // 头像是否圆形
  coverRadius: radiusMd, // 默认的封面圆角大小

  // CDN加速
  cdn: false,
  cdnOrigin: MODEL_SETTING_CDN_ORIGIN.getValue('jsDelivr'),
  cdnAvatar: true,
  cdnSubject: true,
  cdnRakuen: true,

  //
  cnFirst: true, // 是否中文优先
  filter18x: false, // 屏蔽18x条目
  filterDefault: false, // 屏蔽默认头像用户相关信息
  flat: true, // 扁平化
  heatMap: true, // 章节热力图
  hideScore: false, // 隐藏他人评分
  imageTransition: false, // 图片渐出
  iosMenu: false, // iOS风格弹出菜单
  itemShadow: false, // 首页收藏阴影
  katakana: false, // 片假名终结者
  ripple: false, // 点击水纹效果
  speech: true, // Bangumi娘话语
  vibration: false, // 震动反馈
  tinygrail: false, // 小圣杯是否开启
  autoColorScheme: false, // 黑暗模式跟随系统
  coverThings: true, // 封面拟物
  showGame: false, // 首页显示游戏分类
  xsbShort: true, // 小圣杯缩短资金数字显示
  source: false, // 回复是否显示来源

  //
  userGridNum: MODEL_SETTING_USER_GRID_NUM.getValue('4'),
  initialPage: MODEL_SETTING_INITIAL_PAGE.getValue('进度'), // 启动页
  quality: MODEL_SETTING_QUALITY.getValue('默认'), // 图片质量
  transition: MODEL_SETTING_TRANSITION.getValue('水平'), // 切页动画

  // 收藏首页相关
  homeFilter: true, // 首页列表搜索框
  homeOrigin: false, // 首页条目显示搜索源头
  homeSortSink: true, // 首页已放送章节看完条目下沉
  homeRenderTabs: ['Discovery', 'Timeline', 'Home', 'Rakuen', 'User'], // 首页Tabs项
  homeLayout: MODEL_SETTING_HOME_LAYOUT.getValue('列表'), // 首页收藏布局
  homeSorting: MODEL_SETTING_HOME_SORTING.getValue('APP'), // 首页收藏排序

  // 发现页自定义菜单
  discoveryMenu: [
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
    'Series',
    'Character',
    'Catalogs',
    'Link'
  ],
  discoveryTodayOnair: true, // 发现页今日放送
  discoveryMenuNum: 5, // 发现菜单一列个数

  // 条目页面布局
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
