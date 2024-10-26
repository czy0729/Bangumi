/*
 * @Author: czy0729
 * @Date: 2019-07-13 14:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-27 04:58:16
 */
import {
  MODEL_SETTING_CDN_ORIGIN,
  MODEL_SETTING_HOME_COUNT_VIEW,
  MODEL_SETTING_HOME_GRID_COVER_LAYOUT,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_USER_GRID_NUM,
  VERSION_GITHUB_RELEASE,
  WEB
} from '@constants'
import { IOS_IMAGE_CACHE_V2 } from '@src/config'
import { radiusMd } from '@styles'
import {
  SettingCDNOrigin,
  SettingHomeCountView,
  SettingHomeGridCoverLayout,
  SettingHomeLayout,
  SettingHomeSorting,
  SettingInitialPage,
  SettingQuality,
  SettingTransition,
  SettingUserGridNum
} from '@types'
import { HomeRenderTabs, HomeTabs, LayoutValue, LikeRec, TrackIds, UserRemark } from './types'

export const NAMESPACE = 'System'

// -------------------- init --------------------
/** 条目页面 */
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

  /** 动漫巡礼信息 */
  showAnitabi: true as LayoutValue,

  /** 关联 */
  showRelations: true as LayoutValue,

  /** 目录 */
  showCatalog: (false || WEB) as LayoutValue,

  /** 动态 */
  showRecent: (false || WEB) as LayoutValue,

  /** 日志 */
  showBlog: (false || WEB) as LayoutValue,

  /** 帖子 */
  showTopic: (false || WEB) as LayoutValue,

  /** 猜你喜欢 */
  showLike: (false || WEB) as LayoutValue,

  /** 吐槽 */
  showComment: true as LayoutValue
} as const

/** 发现页自定义菜单 */
export const INIT_DISCOVERY_MENU = WEB
  ? ([
      'Rank',
      'Anime',
      'Browser',
      'Catalog',
      'Calendar',
      'DiscoveryBlog',
      'Tags',
      'Staff',
      'Smb',
      'Netabare',
      'Open',
      'Like',
      'Recommend',
      'Wiki',
      'UserTimeline',
      'Series',
      'Character',
      'Catalogs'
    ] as const)
  : ([
      'Rank',
      'Anime',
      'Browser',
      'Catalog',
      'Calendar',
      'DiscoveryBlog',
      'Tags',
      'Staff',
      'Anitama',
      'Open',
      'Search',
      'Tinygrail',
      'Guess',
      'Wiki',
      'Yearbook',
      'UserTimeline',
      'Netabare',
      'Smb',
      'BilibiliSync',
      'DoubanSync',
      'Series',
      'Backup',
      'Character',
      'Catalogs',
      'Link'
    ] as const)

/** 默认设置 */
export const INIT_SETTING = {
  /** 简体转繁体 */
  s2t: false,

  /** 简体转繁体词库 */
  s2tLocal: 'tw' as 'tw' | 'hk',

  /** 黑暗模式是否纯黑 */
  deepDark: true,

  /** @deprecated 设置页面显示最基本的设置 */
  simple: true,

  /** 头像是否圆形 */
  avatarRound: false,

  /** @deprecated 默认的封面圆角大小 */
  coverRadius: radiusMd,

  /* 圆角过渡 */
  squircle: WEB,

  /** 使用 CDN 加速 */
  cdn: false,

  /** @deprecated CDN 源头 */
  cdnOrigin: MODEL_SETTING_CDN_ORIGIN.getValue<SettingCDNOrigin>('magma'),

  /** 头像启用付费 CDN */
  cdnAvatarV2: false,

  /** 是否中文优先 */
  cnFirst: true,

  /** 屏蔽敏感条目 */
  filter18x: false,

  /** 屏蔽默认头像用户相关信息 */
  filterDefault: false,

  /** @deprecated 扁平化 */
  flat: true,

  /** 章节热力图 */
  heatMap: true,

  /** 打开外部浏览器前复制网址 */
  openInfo: true,

  /** 隐藏他人评分 */
  hideScore: false,

  /** 图片渐出 */
  imageFadeIn: true,

  /** @deprecated iOS 风格弹出菜单 */
  iosMenu: false,

  /** @deprecated 首页收藏阴影 */
  itemShadow: false,

  /** 片假名终结者 */
  katakana: false,

  /** Bangumi 娘话语 */
  speech: true,

  /** 震动反馈 */
  vibration: false,

  /** 主题跟随系统 */
  autoColorScheme: false,

  /** 是否允许点击 Logo 切换主题 */
  logoToggleTheme: false,

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

  /** 时光机网格个数 */
  userGridNum: MODEL_SETTING_USER_GRID_NUM.getValue<SettingUserGridNum>('4'),

  /** 时光机分页 */
  userPagination: true,

  /** 用户备注 */
  userRemark: {} as UserRemark,

  /** 空间番剧自动折叠 */
  zoneCollapse: false,

  /** 启动页 */
  initialPage: MODEL_SETTING_INITIAL_PAGE.getValue<SettingInitialPage>('进度'),

  /** @deprecated 图片质量 */
  quality: MODEL_SETTING_QUALITY.getValue<SettingQuality>('默认'),

  /** 切页动画 */
  transition: MODEL_SETTING_TRANSITION.getValue<SettingTransition>('水平'),

  /** 首页列表搜索框 */
  homeFilter: true,

  /** 首页条目显示搜索源头 */
  homeOrigin: false as LayoutValue,

  /** 首页条目一直显示放送时间 */
  homeOnAir: false,

  /** 首页已放送章节看完条目下沉 */
  homeSortSink: true,

  /** 长篇动画从最后看过开始显示 */
  homeEpStartAtLastWathed: true,

  /** 首页 Tabs 项 */
  homeRenderTabs: ['Discovery', 'Timeline', 'Home', 'Rakuen', 'User'] as HomeRenderTabs,

  /** 首页进度 Tabs 范围 */
  homeTabs: ['all', 'anime', 'book', 'real'] as HomeTabs,

  /** 首页收藏布局 */
  homeLayout: MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>('列表'),

  /** 首页收藏列表布局时, 是否紧凑显示列表项 */
  homeListCompact: false,

  /** 首页收藏网格布局时, 条目封面形状 */
  homeGridCoverLayout:
    MODEL_SETTING_HOME_GRID_COVER_LAYOUT.getValue<SettingHomeGridCoverLayout>('正方形'),

  /** 首页收藏网格布局时, 是否显示条目标题 */
  homeGridTitle: true,

  /** 首页收藏网格布局时, 较少章节按钮时, 是否自适应宽度 */
  homeGridEpAutoAdjust: true,

  /** 首页放送数字显示 */
  homeCountView: MODEL_SETTING_HOME_COUNT_VIEW.getValue<SettingHomeCountView>('A'),

  /** 首页收藏排序 */
  homeSorting: MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('网页'),

  /** 首页右上角自定义功能 (左) */
  homeTopLeftCustom: 'Calendar',

  /** 首页右上角自定义功能 (右) */
  homeTopRightCustom: 'Search',

  /** 发现页自定义菜单 */
  discoveryMenu: [...INIT_DISCOVERY_MENU],

  /** 发现页今日放送 */
  discoveryTodayOnair: true,

  /** 发现菜单一列个数 */
  discoveryMenuNum: 5,

  /** 发现页看板娘 live-2d */
  live2D: true,

  /** 发现页看板娘 live-2d 点击发声 */
  live2DVoice: false,

  /** 是否不使用字体 */
  customFontFamily: false,

  /** 时间胶囊点击条目显示 Popable */
  timelinePopable: true,

  /** 是否公开使用在线状态 */
  onlineStatus: false,

  /** 条目标签是否展开 */
  subjectTagsExpand: true,

  /** 条目标签是否显示优于同类型百分比 */
  subjectTagsRec: WEB,

  /** 条目发布日期是否显示到月份 */
  subjectShowAirdayMonth: true,

  /** 突出显示源头按钮 */
  focusOrigin: WEB,

  /** 若有自定义跳转隐藏通用源头按钮 */
  focusAction: false,

  /** 图片是否开启新本地缓存策略 (iOS) */
  iosImageCacheV2: IOS_IMAGE_CACHE_V2,

  /** 图片加载骨架屏动画 */
  imageSkeleton: true,

  /** 放送提醒菜单增加导出 ICS */
  exportICS: false,

  /** 追踪用户动画评论 ids */
  commentAnime: [] as TrackIds,

  /** 追踪用户书籍评论 ids */
  commentBook: [] as TrackIds,

  /** 追踪用户游戏评论 ids */
  commentGame: [] as TrackIds,

  /** 追踪用户音乐评论 ids */
  commentMusic: [] as TrackIds,

  /** 追踪用户三次元评论 ids */
  commentReal: [] as TrackIds,

  /** 是否启用 webhook */
  webhook: false,

  /** webhook 地址 */
  webhookUrl: '',

  /**
   * 猜你喜欢推荐分数是否添加对应维度权重
   * ['自己评分', '收藏状态', '条目排名', '条目分数', '已看集数',
   *  '自己点评', '私密收藏', '最近收藏', '标签倾向', '多次推荐']
   */
  likeRec: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] as LikeRec,

  /** 猜你喜欢显示已收藏条目 */
  likeCollected: true,

  /** 启用毛玻璃布局 (android) */
  androidBlur: WEB,

  /** 毛玻璃: 首屏页面顶部和底部 (android) */
  blurBottomTabs: WEB,

  /** 毛玻璃: 轻提示 (android) */
  blurToast: WEB,

  /** 毛玻璃: 模态框 (android) */
  blurModal: WEB,

  /** 自定义百度翻译 APP ID */
  baiduAppId: '',

  /** 自定义百度翻译秘钥 */
  baiduKey: '',

  /** 条目页面布局 */
  ...INIT_SUBJECT_LAYOUT
}

/** 调试模式参数 */
export const INIT_DEV_EVENT = {
  enabled: false,
  grid: true,
  text: true,
  sum: false,
  mini: false
}

/** 发行版本参数 */
export const INIT_RELEASE = {
  name: VERSION_GITHUB_RELEASE,
  downloadUrl: ''
}

/** 全屏图片画廊参数 */
export const INIT_IMAGE_VIEWER = {
  visible: false,
  imageUrls: [],
  index: 0,
  mini: false
}

export const STATE = {
  /** 云端配置数据 */
  ota: {},

  /** 高级会员 */
  advance: false,

  /** 高级会员详情 */
  advanceDetail: {
    _loaded: 0
  },

  /** 基本设置 */
  setting: INIT_SETTING,

  /** 发布版本 */
  release: INIT_RELEASE,

  /** 是否显示图片预览 */
  imageViewer: INIT_IMAGE_VIEWER,

  /** 是否开发环境 */
  dev: false,

  /** 是否显示埋点统计 */
  devEvent: INIT_DEV_EVENT,

  /** @deprecated iOS 首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审 */
  iosUGCAgree: false,

  /** 用于标记 APP 启动后是否进入静止期 */
  rendered: false,

  /** 用于在 bangumi-oss ota hash 更新后, 强制刷新 APP 内所有封面 */
  hashSubjectOTALoaded: 0,

  /** 统计 */
  t: {}
}

export const LOADED = {
  advance: false,
  advanceDetail: false,
  dev: false,
  devEvent: false,
  iosUGCAgree: false,
  ota: false,
  release: false,
  setting: false,
  t: true
}
