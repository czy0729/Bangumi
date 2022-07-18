/*
 * 字典
 * @Todo: 使用TS枚举重构
 *
 * @Author: czy0729
 * @Date: 2019-03-17 02:45:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-17 16:46:30
 */
import { IOS } from '../constants'

type ModelItem = {
  label: string
  value: string
  title?: string
}

class Model {
  constructor(data: readonly ModelItem[]) {
    this.data = data
  }

  data: any = []

  /**
   * 优先通过value找label
   * @param {*} value
   */
  getLabel<T = string | false>(value: any): T {
    const find = this.data.find(item => item.value == value || item.title === value)
    return find ? find.label : false
  }

  /**
   * 优先通过label找value
   * @param {*} label
   */
  getValue<T = string | false>(label: any): T {
    const find = this.data.find(item => item.label == label || item.title === label)
    return find ? find.value : false
  }

  /**
   * 优先通过label找title
   * @param {*} label
   */
  getTitle<T = string | false>(label: any): T {
    const find = this.data.find(item => item.label == label || item.value == label)
    return find ? find.title : false
  }
}

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

/** 条目类型 */
export const MODEL_SUBJECT_TYPE = new Model(SUBJECT_TYPE)

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
export const MODEL_EP_STATUS = new Model(EP_STATUS)

/** 章节类型 */
export const MODEL_EP_TYPE = new Model([
  {
    label: '普通',
    value: '1'
  },
  {
    label: 'SP',
    value: '0'
  }
])

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

/** 收藏状态 */
export const MODEL_COLLECTION_STATUS = new Model(COLLECTION_STATUS)

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
export const MODEL_RATING_STATUS = new Model(RATING_STATUS)

/** 收藏隐私 */
export const MODEL_PRIVATE = new Model([
  {
    label: '公开',
    value: '0'
  },
  {
    label: '私密',
    value: '1'
  }
])

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
export const MODEL_TIMELINE_SCOPE = new Model(TIMELINE_SCOPE)

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
  },
  // {
  //   label: '天窗',
  //   value: 'doujin'
  // },
  {
    label: '',
    value: 'all'
  }
] as const

/** 时间胶囊类型 */
export const MODEL_TIMELINE_TYPE = new Model(TIMELINE_TYPE)

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
export const MODEL_RAKUEN_SCOPE = new Model(RAKUEN_SCOPE)

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
export const MODEL_RAKUEN_TYPE = new Model(RAKUEN_TYPE)

/** 小组范围 */
export const MODEL_RAKUEN_TYPE_GROUP = new Model([
  {
    label: '全部', // 全部小组
    value: 'group'
  },
  {
    label: '已加入', // 小组话题
    value: 'my_group'
  },
  {
    label: '我发表', // 我发表的话题
    value: 'my_group&filter=topic'
  },
  {
    label: '我回复', // 我回复的话题
    value: 'my_group&filter=reply'
  }
])

/** 人物类型 */
export const MODEL_RAKUEN_TYPE_MONO = new Model([
  {
    label: '全部', // 全部人物
    value: 'mono'
  },
  {
    label: '虚拟', // 虚拟角色
    value: 'mono&filter=character'
  },
  {
    label: '现实', // 现实人物
    value: 'mono&filter=person'
  }
])

/** 人物排序 */
export const MODEL_MONO_WORKS_ORDERBY = new Model([
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
])

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
    value: 'subject_5'
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
export const MODEL_SEARCH_CAT = new Model(SEARCH_CAT)

/** 搜索细度 */
export const MODEL_SEARCH_LEGACY = new Model([
  {
    label: '模糊',
    value: ''
  },
  {
    label: '精确',
    value: '1'
  }
])

/** 文章站点 */
export const NEWS = IOS
  ? [
      {
        label: '动漫之家',
        value: 'https://m.news.dmzj.com'
      }
    ]
  : [
      {
        label: '动漫之家',
        value: 'https://m.news.dmzj.com'
      },
      {
        label: '机核GCORES',
        value: 'https://www.gcores.com/news'
      }
    ]

/** 文章站点 */
export const MODEL_NEWS = new Model(NEWS)

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
export const MODEL_BROWSER_SORT = new Model(BROWSER_SORT)

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
export const MODEL_SETTING_HOME_LAYOUT = new Model(SETTING_HOME_LAYOUT)

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
  SETTING_HOME_GRID_COVER_LAYOUT
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
export const MODEL_SETTING_HOME_SORTING = new Model(SETTING_HOME_SORTING)

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
export const MODEL_SETTING_INITIAL_PAGE = new Model(SETTING_INITIAL_PAGE)

/** [设置] 图片质量 */
export const SETTING_QUALITY = [
  {
    label: '默认',
    value: 'default'
  },
  // {
  //   label: 'WiFi下高质量',
  //   value: 'wifi-best'
  // },
  {
    label: '高',
    value: 'best'
  },
  {
    label: '低',
    value: 'mini'
  }
] as const

/** [设置] 图片质量 */
export const MODEL_SETTING_QUALITY = new Model(SETTING_QUALITY)

/** [设置] 字号 */
export const SETTING_FONTSIZEADJUST = [
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
export const MODEL_SETTING_FONTSIZEADJUST = new Model(SETTING_FONTSIZEADJUST)

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
export const MODEL_SETTING_USER_GRID_NUM = new Model(SETTING_USER_GRID_NUM)

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
    label: '居中缩放',
    value: 'scale'
  }
] as const

/** [设置] 切页动画 */
export const MODEL_SETTING_TRANSITION = new Model(SETTING_TRANSITION)

/** [设置] 同步设置 */
export const MODEL_SETTING_SYNC = new Model([
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
])

/** [设置] CDN 源头 */
export const MODEL_SETTING_CDN_ORIGIN = new Model([
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
])

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
export const MODEL_RAKUEN_SCROLL_DIRECTION = new Model(RAKUEN_SCROLL_DIRECTION)

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
export const MODEL_COLLECTIONS_ORDERBY = new Model(COLLECTIONS_ORDERBY)

/** 标签排序 */
export const TAG_ORDERBY = [
  {
    label: '名称',
    value: ''
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

/** 标签排序 */
export const MODEL_TAG_ORDERBY = new Model(TAG_ORDERBY)

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
    label: '其他',
    value: 'misc'
  }
] as const

/** 动画筛选 */
export const MODEL_RANK_ANIME_FILTER = new Model(RANK_ANIME_FILTER)

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
    label: '画集',
    value: 'illustration'
  },
  {
    label: '其他',
    value: 'misc'
  }
] as const

/** 书籍筛选 */
export const MODEL_RANK_BOOK_FILTER = new Model(RANK_BOOK_FILTER)

/** 游戏筛选 */
export const RANK_GAME_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: 'PC',
    value: 'pc'
  },
  {
    label: 'NS',
    value: 'ns'
  },
  {
    label: 'PS5',
    value: 'ps5'
  },
  {
    label: 'PS4',
    value: 'ps4'
  },
  {
    label: 'PSV',
    value: 'psv'
  },
  {
    label: 'Xbox Series X/S',
    value: 'xbox_series_xs'
  },
  {
    label: 'Xbox One',
    value: 'xbox_one'
  },
  {
    label: 'Wii U',
    value: 'will_u'
  },
  {
    label: 'PS3',
    value: 'ps3'
  },
  {
    label: 'Xbox360',
    value: 'xbox360'
  },
  {
    label: '3DS',
    value: '3ds'
  },
  {
    label: 'PSP',
    value: 'psp'
  },
  {
    label: 'Wii',
    value: 'wii'
  },
  {
    label: 'NDS',
    value: 'nds'
  },
  {
    label: 'PS2',
    value: 'ps2'
  },
  {
    label: 'XBOX',
    value: 'xbox'
  },
  {
    label: 'MAC',
    value: 'mac'
  },
  {
    label: 'PS',
    value: 'ps'
  },
  {
    label: 'GBA',
    value: 'gba'
  },
  {
    label: 'GB',
    value: 'gb'
  },
  {
    label: 'FC',
    value: 'fc'
  }
] as const

/** 游戏筛选 */
export const MODEL_RANK_GAME_FILTER = new Model(RANK_GAME_FILTER)

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
    label: '其他',
    value: 'misc'
  }
] as const

/** 三次元筛选 */
export const MODEL_RANK_REAL_FILTER = new Model(RANK_REAL_FILTER)

/** [小圣杯] 股类型 */
export const MODEL_TINYGRAIL_ASSETS_TYPE = new Model([
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
])

/** [小圣杯] 工具条类型 */
export const MODEL_TINYGRAIL_CACULATE_TYPE = new Model([
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
])

/** [小圣杯] 工具条圣殿类型 */
export const MODEL_TINYGRAIL_CACULATE_TEMPLE_TYPE = new Model([
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
])

/** [小圣杯] 首富类型 */
export const MODEL_TINYGRAIL_CACULATE_RICH_TYPE = new Model([
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
])
