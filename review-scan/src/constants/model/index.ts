/*
 * 字典
 * @Todo: 使用 TS 枚举重构
 * @Author: czy0729
 * @Date: 2019-03-17 02:45:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-11 01:06:50
 */
import { HOST_DMZJ, IOS } from '../constants'
import { Model } from './utils'

/** 条目类型 */
export const SUBJECT_TYPE = [
  {
    label: 'anime',
    value: '2',
    title: '动画'
  },
  {
    label: 'book',
    value: '1',
    title: '书籍'
  },
  {
    label: 'game',
    value: '4',
    title: '游戏'
  },
  {
    label: 'music',
    value: '3',
    title: '音乐'
  },
  {
    label: 'real',
    value: '6',
    title: '三次元'
  }
] as const

/**
 * 条目类型
 *  - { label: 'anime', value: '2', title: '动画' }
 * */
export const MODEL_SUBJECT_TYPE = new Model(SUBJECT_TYPE, 'SUBJECT_TYPE')

/** 章节状态 */
export const EP_STATUS = [
  {
    label: '想看',
    value: 'queue'
  },
  {
    label: '看过',
    value: 'watched'
  },
  {
    label: '抛弃',
    value: 'drop'
  },
  {
    label: '撤销',
    value: 'remove'
  }
] as const

/** 章节状态 */
export const MODEL_EP_STATUS = new Model(EP_STATUS, 'EP_STATUS')

/** 章节类型 */
export const EP_TYPE = [
  {
    label: '普通',
    value: '1'
  },
  {
    label: 'SP',
    value: '0'
  }
] as const

/** 章节类型 */
export const MODEL_EP_TYPE = new Model(EP_TYPE, 'EP_TYPE')

/** 收藏状态 */
export const COLLECTION_STATUS = [
  {
    label: '想看',
    value: 'wish',
    title: '1'
  },
  {
    label: '看过',
    value: 'collect',
    title: '2'
  },
  {
    label: '在看',
    value: 'do',
    title: '3'
  },
  {
    label: '搁置',
    value: 'on_hold',
    title: '4'
  },
  {
    label: '抛弃',
    value: 'dropped',
    title: '5'
  }
] as const

/**
 * 收藏状态
 *  - { label: '想看', value: 'wish', title: '1' }
 * */
export const MODEL_COLLECTION_STATUS = new Model(COLLECTION_STATUS, 'COLLECTION_STATUS')

/** 打分状态 */
export const RATING_STATUS = [
  {
    label: '想看',
    value: 'wishes'
  },
  {
    label: '看过',
    value: 'collections'
  },
  {
    label: '在看',
    value: 'doings'
  },
  {
    label: '搁置',
    value: 'on_hold'
  },
  {
    label: '抛弃',
    value: 'dropped'
  }
] as const

/** 打分状态 */
export const MODEL_RATING_STATUS = new Model(RATING_STATUS, 'RATING_STATUS')

/** 收藏隐私 */
export const PRIVATE = [
  {
    label: '公开',
    value: '0'
  },
  {
    label: '私密',
    value: '1'
  }
] as const

/** 收藏隐私 */
export const MODEL_PRIVATE = new Model(PRIVATE, 'PRIVATE')

export const TIMELINE_SCOPE = [
  {
    label: '好友',
    value: 'friend'
  },
  {
    label: '全站',
    value: 'all'
  },
  {
    label: '自己',
    value: 'self'
  }
] as const

/** 时间胶囊范围 */
export const MODEL_TIMELINE_SCOPE = new Model(TIMELINE_SCOPE, 'TIMELINE_SCOPE')

export const TIMELINE_TYPE = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '吐槽',
    value: 'say'
  },
  {
    label: '收藏',
    value: 'subject'
  },
  {
    label: '进度',
    value: 'progress'
  },
  {
    label: '日志',
    value: 'blog'
  },
  {
    label: '人物',
    value: 'mono'
  },
  {
    label: '好友',
    value: 'relation'
  },
  {
    label: '小组',
    value: 'group'
  },
  {
    label: '维基',
    value: 'wiki'
  },
  {
    label: '目录',
    value: 'index'
  }
] as const

/** 时间胶囊类型 */
export const MODEL_TIMELINE_TYPE = new Model(TIMELINE_TYPE, 'TIMELINE_TYPE')

/** 超展开板块 */
export const RAKUEN_SCOPE = [
  {
    label: '全局聚合',
    value: 'topiclist'
  },
  {
    label: '新番乐园',
    value: 'new_bangumi'
  },
  {
    label: 'etokei 绘时计',
    value: 'tokei'
  },
  {
    label: '经典动画',
    value: 'classical_bangumi'
  },
  {
    label: '天窗联盟',
    value: 'doujin'
  },
  {
    label: '1/8位面',
    value: 'pvc'
  }
] as const

/** 超展开板块 */
export const MODEL_RAKUEN_SCOPE = new Model(RAKUEN_SCOPE, 'RAKUEN_SCOPE')

/** 超展开全局聚合类型 */
export const RAKUEN_TYPE = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '小组',
    value: 'group'
  },
  {
    label: '条目',
    value: 'subject'
  },
  {
    label: '热门',
    value: 'hot'
  },
  {
    label: '章节',
    value: 'ep'
  },
  {
    label: '人物',
    value: 'mono'
  }
] as const

/** 超展开全局聚合类型 */
export const MODEL_RAKUEN_TYPE = new Model(RAKUEN_TYPE, 'RAKUEN_TYPE')

/** 小组范围 */
export const RAKUEN_TYPE_GROUP = [
  {
    label: '全部',
    value: 'group'
  },
  {
    label: '已加入',
    value: 'my_group'
  },
  {
    label: '我发表',
    value: 'my_group&filter=topic'
  },
  {
    label: '我回复',
    value: 'my_group&filter=reply'
  }
] as const

/** 小组范围 */
export const MODEL_RAKUEN_TYPE_GROUP = new Model(RAKUEN_TYPE_GROUP, 'RAKUEN_TYPE_GROUP')

/** 人物类型 */
export const RAKUEN_TYPE_MONO = [
  {
    label: '全部',
    value: 'mono'
  },
  {
    label: '虚拟',
    value: 'mono&filter=character'
  },
  {
    label: '现实',
    value: 'mono&filter=person'
  }
] as const

/** 人物类型 */
export const MODEL_RAKUEN_TYPE_MONO = new Model(RAKUEN_TYPE_MONO, 'RAKUEN_TYPE_MONO')

/** 人物排序 */
export const MONO_WORKS_ORDERBY = [
  {
    label: '名称',
    value: 'title'
  },
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '排名',
    value: 'rank'
  }
] as const

/** 人物排序 */
export const MODEL_MONO_WORKS_ORDERBY = new Model(MONO_WORKS_ORDERBY, 'MONO_WORKS_ORDERBY')

/** 搜索类型 */
export const SEARCH_CAT = [
  {
    label: '条目',
    value: 'subject_all'
  },
  {
    label: '动画',
    value: 'subject_2'
  },
  {
    label: '书籍',
    value: 'subject_1'
  },
  {
    label: '音乐',
    value: 'subject_3'
  },
  {
    label: '游戏',
    value: 'subject_4'
  },
  {
    label: '三次元',
    value: 'subject_6'
  },
  {
    label: '人物',
    value: 'mono_all'
  },
  // {
  //   label: '虚拟角色',
  //   value: 'mono_crt'
  // },
  // {
  //   label: '现实人物',
  //   value: 'mono_prsn'
  // }
  {
    label: '用户',
    value: 'user'
  }
] as const

/** 搜索类型 */
export const MODEL_SEARCH_CAT = new Model(SEARCH_CAT, 'SEARCH_CAT')

/** 搜索细度 */
export const SEARCH_LEGACY = [
  {
    label: '模糊',
    value: ''
  },
  {
    label: '精确',
    value: '1'
  }
] as const

/** 搜索细度 */
export const MODEL_SEARCH_LEGACY = new Model(SEARCH_LEGACY, 'SEARCH_LEGACY')

/** 文章站点 */
export const NEWS = [
  {
    label: '和邪社',
    value: 'https://www.hexieshe.cn/category/news'
  },
  {
    label: '机核GCORES',
    value: 'https://www.gcores.com/news'
  },
  {
    label: '动漫之家',
    value: HOST_DMZJ
  }
] as const

/** 文章站点 */
export const MODEL_NEWS = new Model(NEWS, 'NEWS')

/** 索引排序 */
export const BROWSER_SORT = [
  {
    label: '默认',
    value: ''
  },
  {
    label: '排名',
    value: 'rank'
  },
  {
    label: '时间',
    value: 'date'
  }
] as const

/** 索引排序 */
export const MODEL_BROWSER_SORT = new Model(BROWSER_SORT, 'BROWSER_SORT')

/** [设置] 首页收藏布局 */
export const SETTING_HOME_LAYOUT = [
  {
    label: '列表',
    value: 'list'
  },
  {
    label: '网格',
    value: 'grid'
  }
] as const

/** [设置] 首页收藏布局 */
export const MODEL_SETTING_HOME_LAYOUT = new Model(SETTING_HOME_LAYOUT, 'SETTING_HOME_LAYOUT')

/** [设置] 首页收藏网格布局时，条目封面形状 */
export const SETTING_HOME_GRID_COVER_LAYOUT = [
  {
    label: '正方形',
    value: 'square'
  },
  {
    label: '长方形',
    value: 'rectangle'
  }
] as const

/** [设置] 首页收藏网格布局时，条目封面形状 */
export const MODEL_SETTING_HOME_GRID_COVER_LAYOUT = new Model(
  SETTING_HOME_GRID_COVER_LAYOUT,
  'SETTING_HOME_GRID_COVER_LAYOUT'
)

/** [设置] 放送数字显示 */
export const SETTING_HOME_COUNT_VIEW = [
  {
    label: 'A',
    value: 'A'
  },
  {
    label: 'B',
    value: 'B'
  },
  {
    label: 'C',
    value: 'C'
  },
  {
    label: 'D',
    value: 'D'
  }
] as const

/** [设置] 放送数字显示 */
export const MODEL_SETTING_HOME_COUNT_VIEW = new Model(
  SETTING_HOME_COUNT_VIEW,
  'SETTING_HOME_COUNT_VIEW'
)

/** [设置] 首页收藏排序 */
export const SETTING_HOME_SORTING = [
  {
    label: 'APP',
    value: 'default'
  },
  {
    label: '放送',
    value: 'onair'
  },
  {
    label: '网页',
    value: 'web'
  }
] as const

/** [设置] 首页收藏排序 */
export const MODEL_SETTING_HOME_SORTING = new Model(SETTING_HOME_SORTING, 'SETTING_HOME_SORTING')

/** [设置] 启动页面 */
export const SETTING_INITIAL_PAGE = [
  {
    label: '发现',
    value: 'Discovery'
  },
  {
    label: '时间胶囊',
    value: 'Timeline'
  },
  {
    label: '进度',
    value: 'Home'
  },
  {
    label: '超展开',
    value: 'Rakuen'
  },
  {
    label: '时光机',
    value: 'User'
  },
  {
    label: '小圣杯',
    value: 'Tinygrail'
  }
] as const

/** [设置] 启动页面 */
export const MODEL_SETTING_INITIAL_PAGE = new Model(SETTING_INITIAL_PAGE, 'SETTING_INITIAL_PAGE')

/** [设置] 字号 */
export const SETTING_FONTSIZEADJUST = [
  {
    label: '-2',
    value: '-2'
  },
  {
    label: '-1',
    value: '-1'
  },
  {
    label: '标准',
    value: '0'
  },
  {
    label: '+1',
    value: '+1'
  },
  {
    label: '+2',
    value: '+2'
  },
  {
    label: '+4',
    value: '+4'
  }
] as const

/** [设置] 字号 */
export const MODEL_SETTING_FONTSIZEADJUST = new Model(
  SETTING_FONTSIZEADJUST,
  'SETTING_FONTSIZEADJUST'
)

/** [设置] 用户空间网格个数 */
export const SETTING_USER_GRID_NUM = [
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  }
] as const

/** [设置] 用户空间网格个数 */
export const MODEL_SETTING_USER_GRID_NUM = new Model(SETTING_USER_GRID_NUM, 'SETTING_USER_GRID_NUM')

/** [设置] 切页动画 */
export const SETTING_TRANSITION = [
  {
    label: '水平',
    value: 'horizontal'
  },
  {
    label: '垂直',
    value: 'vertical'
  },
  {
    label: IOS ? '渐变' : '居中缩放',
    value: 'scale'
  }
] as const

/** [设置] 切页动画 */
export const MODEL_SETTING_TRANSITION = new Model(SETTING_TRANSITION, 'SETTING_TRANSITION')

/** [设置] 条目版块分割线样式 */
export const SETTING_SUBJECT_SPLIT_STYLES = [
  {
    label: '不使用',
    value: 'off'
  },
  {
    label: '分割线 (1)',
    value: 'line-1'
  },
  {
    label: '分割线 (2)',
    value: 'line-2'
  },
  {
    label: '标题 (粉)',
    value: 'title-main'
  },
  {
    label: '标题 (橙)',
    value: 'title-warning'
  },
  {
    label: '标题 (蓝)',
    value: 'title-primary'
  },
  {
    label: '标题 (绿)',
    value: 'title-success'
  }
] as const

/** [设置] 条目版块分割线样式 */
export const MODEL_SETTING_SUBJECT_SPLIT_STYLES = new Model(
  SETTING_SUBJECT_SPLIT_STYLES,
  'SETTING_SUBJECT_SPLIT_STYLES'
)

/** [设置] 同步设置 */
export const SETTING_SYNC = [
  {
    label: '恢复默认',
    value: 'default'
  },
  {
    label: '上传',
    value: 'upload'
  },
  {
    label: '下载',
    value: 'download'
  }
] as const

/** [设置] 同步设置 */
export const MODEL_SETTING_SYNC = new Model(SETTING_SYNC, 'SETTING_SYNC')

/** [设置] CDN 源头 */
export const SETTING_CDN_ORIGIN = [
  {
    label: 'fastly',
    value: 'fastly'
  },
  {
    label: 'jsDelivr',
    value: 'jsDelivr'
  },
  {
    label: 'OneDrive',
    value: 'OneDrive'
  },
  {
    label: 'magma',
    value: 'magma'
  }
] as const

/** [设置] CDN 源头 */
export const MODEL_SETTING_CDN_ORIGIN = new Model(SETTING_CDN_ORIGIN, 'SETTING_CDN_ORIGIN')

/** [设置] 楼层导航条方向 */
export const RAKUEN_SCROLL_DIRECTION = [
  {
    label: '隐藏',
    value: 'none'
  },
  {
    label: '左侧',
    value: 'left'
  },
  {
    label: '底部',
    value: 'bottom'
  },
  {
    label: '右侧',
    value: 'right'
  }
] as const

/** [设置] 楼层导航条方向 */
export const MODEL_RAKUEN_SCROLL_DIRECTION = new Model(
  RAKUEN_SCROLL_DIRECTION,
  'RAKUEN_SCROLL_DIRECTION'
)

/** [设置] 楼层中图片自动加载 */
export const RAKUEN_AUTO_LOAD_IMAGE = [
  {
    label: '不加载',
    value: '0'
  },
  {
    label: '0.2m',
    value: '200'
  },
  {
    label: '2m',
    value: '2000'
  },
  {
    label: '自动',
    value: '10000'
  }
] as const

/** [设置] 楼层中图片自动加载 */
export const MODEL_RAKUEN_AUTO_LOAD_IMAGE = new Model(
  RAKUEN_AUTO_LOAD_IMAGE,
  'RAKUEN_AUTO_LOAD_IMAGE'
)

/** [设置] 子楼层折叠 */
export const RAKUEN_SUB_EXPAND = [
  {
    label: '0',
    value: '0'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '8',
    value: '8'
  }
] as const

/** [设置] 子楼层折叠 */
export const MODEL_RAKUEN_SUB_EXPAND = new Model(RAKUEN_SUB_EXPAND, 'RAKUEN_SUB_EXPAND')

/** [设置] 帖子新楼层样式 */
export const RAKUEN_NEW_FLOOR_STYLE = [
  {
    label: '角标',
    value: 'A'
  },
  {
    label: '红点',
    value: 'B'
  },
  {
    label: '背景',
    value: 'C'
  },
  {
    label: '不设置',
    value: 'D'
  }
] as const

/** [设置] 帖子新楼层样式 */
export const MODEL_RAKUEN_NEW_FLOOR_STYLE = new Model(
  RAKUEN_NEW_FLOOR_STYLE,
  'RAKUEN_NEW_FLOOR_STYLE'
)

/** 收藏排序 */
export const COLLECTIONS_ORDERBY = [
  {
    label: '收藏时间',
    value: ''
  },
  {
    label: '评价',
    value: 'rate'
  },
  {
    label: '发售日',
    value: 'date'
  },
  {
    label: '名称',
    value: 'title'
  },
  {
    label: '网站评分',
    value: 'score'
  }
] as const

/** 收藏排序 */
export const MODEL_COLLECTIONS_ORDERBY = new Model(COLLECTIONS_ORDERBY, 'COLLECTIONS_ORDERBY')

/** 标签排序 */
export const TAG_ORDERBY = [
  {
    label: '排名',
    value: 'rank'
  },
  {
    label: '热度',
    value: 'trends'
  },
  {
    label: '收藏',
    value: 'collects'
  },
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '名称',
    value: 'title'
  }
] as const

/** 标签排序 */
export const MODEL_TAG_ORDERBY = new Model(TAG_ORDERBY, 'TAG_ORDERBY')

/** 动画筛选 */
export const RANK_ANIME_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: 'TV',
    value: 'tv'
  },
  {
    label: 'WEB',
    value: 'web'
  },
  {
    label: 'OVA',
    value: 'ova'
  },
  {
    label: '剧场版',
    value: 'movie'
  },
  {
    label: '动态漫画',
    value: 'anime_comic'
  },
  {
    label: '其他',
    value: 'misc'
  }
] as const

/** 动画筛选 */
export const MODEL_RANK_ANIME_FILTER = new Model(RANK_ANIME_FILTER, 'RANK_ANIME_FILTER')

/** 书籍筛选 */
export const RANK_BOOK_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '漫画',
    value: 'comic'
  },
  {
    label: '小说',
    value: 'novel'
  },
  {
    label: '绘本',
    value: 'picture'
  },
  {
    label: '公式书',
    value: 'official'
  },
  {
    label: '写真',
    value: 'photo'
  },
  {
    label: '其他',
    value: 'misc'
  }
] as const

/** 书籍筛选 */
export const MODEL_RANK_BOOK_FILTER = new Model(RANK_BOOK_FILTER, 'RANK_BOOK_FILTER')

/** 书籍二级筛选 */
export const RANK_BOOK_FILTER_SUB = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '系列',
    value: 'series'
  },
  {
    label: '单行本',
    value: 'offprint'
  }
] as const

/** 书籍筛选 */
export const MODEL_RANK_BOOK_FILTER_SUB = new Model(RANK_BOOK_FILTER_SUB, 'RANK_BOOK_FILTER_SUB')

/** 游戏筛选 */
export const RANK_GAME_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '游戏',
    value: 'games'
  },
  {
    label: '扩展包',
    value: 'dlc'
  },
  {
    label: '软件',
    value: 'software'
  },
  {
    label: '桌游',
    value: 'tabletop'
  }
  // {
  //   label: '其他',
  //   value: 'misc'
  // }
] as const

/** 游戏筛选 */
export const MODEL_RANK_GAME_FILTER = new Model(RANK_GAME_FILTER, 'RANK_GAME_FILTER')

/** 游戏二级筛选 */
export const RANK_GAME_FILTER_SUB = [
  {
    label: '全部',
    value: ''
  },
  {
    label: 'PC',
    value: 'PC'
  },
  {
    label: 'Web',
    value: 'Web'
  },
  {
    label: 'Mac',
    value: 'Mac'
  },
  {
    label: 'Linux',
    value: 'Linux'
  },
  {
    label: 'PS5',
    value: 'PS5'
  },
  {
    label: 'Xbox Series X/S',
    value: 'XSX'
  },
  {
    label: 'Nintendo Switch',
    value: 'NS'
  },
  {
    label: 'iOS',
    value: 'iOS'
  },
  {
    label: 'Android',
    value: 'Android'
  },
  {
    label: 'VR',
    value: 'VR'
  },
  {
    label: 'PSVR2',
    value: 'PSVR2'
  },
  {
    label: '街机',
    value: '街机'
  },
  {
    label: 'Xbox One',
    value: 'XboxOne'
  },
  {
    label: 'Xbox',
    value: 'Xbox'
  },
  {
    label: 'Xbox 360',
    value: 'Xbox360'
  },
  {
    label: 'GBA',
    value: 'GBA'
  },
  {
    label: 'Wii',
    value: 'Wii'
  },
  {
    label: 'NDS',
    value: 'NDS'
  },
  {
    label: 'FC',
    value: 'FC'
  },
  {
    label: '3DS',
    value: '3DS'
  },
  {
    label: 'GBC',
    value: 'GBC'
  },
  {
    label: 'GB',
    value: 'GB'
  },
  {
    label: 'N64',
    value: 'N64'
  },
  {
    label: 'NGC',
    value: 'NGC'
  },
  {
    label: 'SFC',
    value: 'SFC'
  },
  {
    label: 'Wii U',
    value: 'WiiU'
  },
  {
    label: 'PS4',
    value: 'PS4'
  },
  {
    label: 'PSVR',
    value: 'PSVR'
  },
  {
    label: 'PS Vita',
    value: 'PSV'
  },
  {
    label: 'PS3',
    value: 'PS3'
  },
  {
    label: 'PSP',
    value: 'PSP'
  },
  {
    label: 'PS2',
    value: 'PS2'
  },
  {
    label: 'PS',
    value: 'PS'
  },
  {
    label: 'Dreamcast',
    value: 'DC'
  },
  {
    label: 'Sega Saturn',
    value: 'SS'
  },
  {
    label: 'MD',
    value: 'MD'
  },
  {
    label: 'Apple II',
    value: 'AppleII'
  },
  // {
  //   label: 'Amiga',
  //   value: 'Amiga'
  // },
  {
    label: 'DOS',
    value: 'DOS'
  },
  {
    label: 'Symbian',
    value: 'Symbian'
  }
  // {
  //   label: 'PC98',
  //   value: 'PC98'
  // },
  // {
  //   label: 'PCE',
  //   value: 'PCE'
  // },
  // {
  //   label: 'PC88',
  //   value: 'PC88'
  // },
  // {
  //   label: 'X68000',
  //   value: 'X68000'
  // },
] as const

/** 游戏二级筛选 */
export const MODEL_RANK_GAME_FILTER_SUB = new Model(
  RANK_GAME_FILTER_SUB,
  'MODEL_RANK_GAME_FILTER_SUB'
)

/** 三次元筛选 */
export const RANK_REAL_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '日剧',
    value: 'jp'
  },
  {
    label: '欧美剧',
    value: 'en'
  },
  {
    label: '华语剧',
    value: 'cn'
  },
  {
    label: '电视剧',
    value: 'tv'
  },
  {
    label: '电影',
    value: 'movie'
  },
  {
    label: '演出',
    value: 'live'
  },
  {
    label: '综艺',
    value: 'show'
  },
  {
    label: '其他',
    value: 'misc'
  }
] as const

/** 三次元筛选 */
export const MODEL_RANK_REAL_FILTER = new Model(RANK_REAL_FILTER, 'RANK_REAL_FILTER')

/** [小圣杯] 股类型 */
export const TINYGRAIL_ASSETS_TYPE = [
  {
    label: '所有',
    value: 'all'
  },
  {
    label: '流动股',
    value: 'mono'
  },
  {
    label: '圣殿股',
    value: 'temple'
  }
] as const

/** [小圣杯] 股类型 */
export const MODEL_TINYGRAIL_ASSETS_TYPE = new Model(TINYGRAIL_ASSETS_TYPE, 'TINYGRAIL_ASSETS_TYPE')

/** [小圣杯] 工具条类型 */
export const TINYGRAIL_CACULATE_TYPE = [
  {
    label: '持仓价值',
    value: 'value'
  },
  {
    label: '周股息',
    value: 'rateWeek'
  },
  {
    label: '股息',
    value: 'rate'
  },
  {
    label: '持股数',
    value: 'amount'
  },
  {
    label: '市场价',
    value: 'market'
  },
  {
    label: '发行量',
    value: 'total'
  },
  {
    label: '当前价',
    value: 'current'
  },
  {
    label: '交易量',
    value: 'change'
  },
  {
    label: '当前涨跌',
    value: 'fluctuation'
  },
  {
    label: '新番奖励',
    value: 'bonus'
  }
] as const

/** [小圣杯] 工具条类型 */
export const MODEL_TINYGRAIL_CACULATE_TYPE = new Model(
  TINYGRAIL_CACULATE_TYPE,
  'TINYGRAIL_CACULATE_TYPE'
)

/** [小圣杯] 工具条圣殿类型 */
export const TINYGRAIL_CACULATE_TEMPLE_TYPE = [
  {
    label: '持仓价值',
    value: 'value'
  },
  {
    label: '周股息',
    value: 'rateWeek'
  },
  {
    label: '股息',
    value: 'rate'
  },
  {
    label: '持股数',
    value: 'amount'
  }
] as const

/** [小圣杯] 工具条圣殿类型 */
export const MODEL_TINYGRAIL_CACULATE_TEMPLE_TYPE = new Model(
  TINYGRAIL_CACULATE_TEMPLE_TYPE,
  'TINYGRAIL_CACULATE_TEMPLE_TYPE'
)

/** [小圣杯] 首富类型 */
export const TINYGRAIL_CACULATE_RICH_TYPE = [
  {
    label: '周股息',
    value: 'share'
  },
  {
    label: '总资产',
    value: 'assets'
  },
  {
    label: '流动资金',
    value: 'balance'
  },
  {
    label: '初始资金',
    value: 'principal'
  }
] as const

/** [小圣杯] 首富类型 */
export const MODEL_TINYGRAIL_CACULATE_RICH_TYPE = new Model(
  TINYGRAIL_CACULATE_RICH_TYPE,
  'TINYGRAIL_CACULATE_RICH_TYPE'
)

/** [设置] 时区 */
export const TIMEZONE = [
  {
    label: '默认时区',
    value: '9999'
  },
  {
    label: '(GMT -12:00) Eniwetok, Kwajalein',
    value: '-12'
  },
  {
    label: '(GMT -11:00) Midway Island, Samoa',
    value: '-11'
  },
  {
    label: '(GMT -10:00) Hawaii',
    value: '-10'
  },
  {
    label: '(GMT -09:00) Alaska',
    value: '-9'
  },
  {
    label: '(GMT -08:00) Pacific Time (US & Canada), Tijuana',
    value: '-8'
  },
  {
    label: '(GMT -07:00) Mountain Time (US & Canada), Arizona',
    value: '-7'
  },
  {
    label: '(GMT -06:00) Central Time (US & Canada), Mexico City',
    value: '-6'
  },
  {
    label: '(GMT -05:00) Eastern Time (US & Canada), Bogota, Lima, Quito',
    value: '-5'
  },
  {
    label: '(GMT -04:00) Atlantic Time (Canada), Caracas, La Paz',
    value: '-4'
  },
  {
    label: '(GMT -03:30) Newfoundland',
    value: '-3.5'
  },
  {
    label: '(GMT -03:00) Brassila, Buenos Aires, Georgetown, Falkland Is',
    value: '-3'
  },
  {
    label: '(GMT -02:00) Mid-Atlantic, Ascension Is., St. Helena',
    value: '-2'
  },
  {
    label: '(GMT -01:00) Azores, Cape Verde Islands',
    value: '-1'
  },
  {
    label: '(GMT) Casablanca, Dublin, Edinburgh, London, Lisbon, Monrovia',
    value: '0'
  },
  {
    label: '(GMT +01:00) Amsterdam, Berlin, Brussels, Madrid, Paris, Rome',
    value: '1'
  },
  {
    label: '(GMT +02:00) Cairo, Helsinki, Kaliningrad, South Africa',
    value: '2'
  },
  {
    label: '(GMT +03:00) Baghdad, Riyadh, Moscow, Nairobi',
    value: '3'
  },
  {
    label: '(GMT +03:30) Tehran',
    value: '3.5'
  },
  {
    label: '(GMT +04:00) Abu Dhabi, Baku, Muscat, Tbilisi',
    value: '4'
  },
  {
    label: '(GMT +04:30) Kabul',
    value: '4.5'
  },
  {
    label: '(GMT +05:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
    value: '5'
  },
  {
    label: '(GMT +05:30) Bombay, Calcutta, Madras, New Delhi',
    value: '5.5'
  },
  {
    label: '(GMT +05:45) Katmandu',
    value: '5.75'
  },
  {
    label: '(GMT +06:00) Almaty, Colombo, Dhaka, Novosibirsk',
    value: '6'
  },
  {
    label: '(GMT +06:30) Rangoon',
    value: '6.5'
  },
  {
    label: '(GMT +07:00) Bangkok, Hanoi, Jakarta',
    value: '7'
  },
  {
    label: '(GMT +08:00) Beijing, Hong Kong, Perth, Singapore, Taipei',
    value: '8'
  },
  {
    label: '(GMT +09:00) Osaka, Sapporo, Seoul, Tokyo, Yakutsk',
    value: '9'
  },
  {
    label: '(GMT +09:30) Adelaide, Darwin',
    value: '9.5'
  },
  {
    label: '(GMT +10:00) Canberra, Guam, Melbourne, Sydney, Vladivostok',
    value: '10'
  },
  {
    label: '(GMT +11:00) Magadan, New Caledonia, Solomon Islands',
    value: '11'
  },
  {
    label: '(GMT +12:00) Auckland, Wellington, Fiji, Marshall Island',
    value: '12'
  }
] as const

/** [设置] 时区 */
export const MODEL_TIMEZONE = new Model(TIMEZONE, 'TIMEZONE')
