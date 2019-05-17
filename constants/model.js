/*
 * 字典
 * @Author: czy0729
 * @Date: 2019-03-17 02:45:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-16 01:45:36
 */
class Modal {
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
export const MODEL_SUBJECT_TYPE = new Modal([
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
export const MODEL_EP_STATUS = new Modal([
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
export const MODEL_EP_TYPE = new Modal([
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
export const MODEL_COLLECTION_STATUS = new Modal([
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
export const MODEL_PRIVATE = new Modal([
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
export const MODEL_TIMELINE_SCOPE = new Modal([
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
export const MODEL_TIMELINE_TYPE = new Modal([
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
export const MODEL_RAKUEN_SCOPE = new Modal([
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
export const MODEL_RAKUEN_TYPE = new Modal([
  {
    label: '全部',
    value: ''
  },
  {
    label: '小组',
    value: 'group'
  },
  // {
  //   label: '已加入小组话题',
  //   value: 'my_group'
  // },
  // {
  //   label: '我发表的话题',
  //   value: 'my_group&filter=topic'
  // },
  // {
  //   label: '我回复的话题',
  //   value: 'my_group&filter=reply'
  // },
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
  // {
  //   label: '虚拟角色',
  //   value: 'mono&filter=character'
  // },
  // {
  //   label: '现实人物',
  //   value: 'mono&filter=person'
  // }
])

// 搜索类型
export const MODEL_SEARCH_CAT = new Modal([
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
  {
    label: '虚拟角色',
    value: 'mono_crt'
  },
  {
    label: '现实人物',
    value: 'mono_prsn'
  }
])
