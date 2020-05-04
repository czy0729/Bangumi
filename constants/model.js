/*
 * 字典
 * @Author: czy0729
 * @Date: 2019-03-17 02:45:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 17:52:48
 */
class Model {
  constructor(data) {
    this.data = data
  }
  data = []

  /**
   * 优先通过value找label
   * @param {*} value
   */
  getLabel(value) {
    const find = this.data.find(
      item => item.value == value || item.title === value
    )
    return find ? find.label : false
  }

  /**
   * 优先通过label找value
   * @param {*} label
   */
  getValue(label) {
    const find = this.data.find(
      item => item.label == label || item.title === label
    )
    return find ? find.value : false
  }

  /**
   * 优先通过label找title
   * @param {*} label
   */
  getTitle(label) {
    const find = this.data.find(
      item => item.label == label || item.value == label
    )
    return find ? find.title : false
  }
}

// 条目类型
export const MODEL_SUBJECT_TYPE = new Model([
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
])

// 章节状态
export const MODEL_EP_STATUS = new Model([
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
])

// 章节类型
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

// 收藏状态
export const MODEL_COLLECTION_STATUS = new Model([
  {
    label: '想看',
    value: 'wish'
  },
  {
    label: '看过',
    value: 'collect'
  },
  {
    label: '在看',
    value: 'do'
  },
  {
    label: '搁置',
    value: 'on_hold'
  },
  {
    label: '抛弃',
    value: 'dropped'
  }
])

// 收藏隐私
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

// 时间胶囊范围
export const MODEL_TIMELINE_SCOPE = new Model([
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
])

// 时间胶囊类型
export const MODEL_TIMELINE_TYPE = new Model([
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
  {
    label: '天窗',
    value: 'doujin'
  },
  {
    label: '',
    value: 'all'
  }
])

// 超展开板块
export const MODEL_RAKUEN_SCOPE = new Model([
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
])

// 超展开全局聚合类型
export const MODEL_RAKUEN_TYPE = new Model([
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
    label: '章节',
    value: 'ep'
  },
  {
    label: '人物',
    value: 'mono'
  }
])

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
    label: '发表的', // 我发表的话题
    value: 'my_group&filter=topic'
  },
  {
    label: '回复的', // 我回复的话题
    value: 'my_group&filter=reply'
  }
])

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

// 搜索类型
export const MODEL_SEARCH_CAT = new Model([
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
  }
  // {
  //   label: '虚拟角色',
  //   value: 'mono_crt'
  // },
  // {
  //   label: '现实人物',
  //   value: 'mono_prsn'
  // }
])

// 搜索细度
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

// 设置 - 启动页面
export const MODEL_INITIAL_PAGE = new Model([
  {
    label: '进度',
    value: 'Home'
  },
  {
    label: '发现',
    value: 'Discovery'
  },
  {
    label: '时间胶囊',
    value: 'Timeline'
  },
  {
    label: '超展开',
    value: 'Rakuen'
  },
  {
    label: '我的',
    value: 'User'
  },
  {
    label: '小圣杯',
    value: 'Tinygrail'
  }
])

// 设置 - 图片质量
export const MODEL_SETTING_QUALITY = new Model([
  {
    label: '默认',
    value: 'default'
  },
  {
    label: 'WiFi下高质量',
    value: 'wifi-best'
  },
  {
    label: '高质量',
    value: 'best'
  },
  {
    label: '低质量',
    value: 'mini'
  }
])

// 设置 - 字号
export const MODEL_SETTING_FONTSIZEADJUST = new Model([
  {
    label: '小',
    value: '-1'
  },
  {
    label: '标准',
    value: '0'
  },
  {
    label: '大',
    value: '+1'
  },
  {
    label: '超大',
    value: '+2'
  },
  {
    label: '巨无霸',
    value: '+4'
  }
])

// 设置 - 切页动画
export const MODEL_SETTING_TRANSITION = new Model([
  {
    label: '水平',
    value: 'horizontal'
  },
  {
    label: '垂直',
    value: 'vertical'
  }
])

// 超展开设置 - 切页动画
export const MODEL_RAKUEN_SCROLL_DIRECTION = new Model([
  {
    label: '右边',
    value: 'right'
  },
  {
    label: '左边',
    value: 'left'
  },
  {
    label: '底部',
    value: 'bottom'
  },
  {
    label: '隐藏',
    value: 'none'
  }
])

export const MODEL_COLLECTIONS_ORDERBY = new Model([
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
  }
])

export const MODEL_TAG_ORDERBY = new Model([
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
])

export const MODEL_RANK_ANIME_FILTER = new Model([
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
])

export const MODEL_RANK_BOOK_FILTER = new Model([
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
])

export const MODEL_RANK_GAME_FILTER = new Model([
  {
    label: '全部',
    value: ''
  },
  {
    label: 'PC',
    value: 'pc'
  },
  {
    label: 'PS4',
    value: 'ps4'
  },
  {
    label: 'NS',
    value: 'ns'
  },
  {
    label: 'Xbox One',
    value: 'xbox_one'
  },
  {
    label: 'PSV',
    value: 'psv'
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
])

export const MODEL_RANK_REAL_FILTER = new Model([
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
])

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
