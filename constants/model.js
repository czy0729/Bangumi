/*
 * @Author: czy0729
 * @Date: 2019-03-17 02:45:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-28 13:25:06
 */

class Modal {
  constructor(data) {
    this.data = data
  }
  data = []
  getLabel(value) {
    const find = this.data.find(item => item.value == value)
    return find ? find.label : false
  }
  getValue(label) {
    const find = this.data.find(item => item.label == label)
    return find ? find.value : false
  }
}

// 条目类型
export const MODEL_SUBJECT_TYPE = new Modal([
  {
    label: 'book',
    value: '1'
  },
  {
    label: 'anime',
    value: '2'
  },
  {
    label: 'music',
    value: '3'
  },
  {
    label: 'game',
    value: '4'
  },
  {
    label: 'real',
    value: '6'
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

// 评分
export const MODEL_RATING = {
  getLabel(score) {
    if (score === undefined) return false
    if (score >= 9.5) return '超神作'
    if (score >= 8.5) return '神作'
    if (score >= 7.5) return '力荐'
    if (score >= 6.5) return '推荐'
    if (score >= 5.5) return '还行'
    if (score >= 4.5) return '不过不失'
    if (score >= 3.5) return '较差'
    if (score >= 2.5) return '差'
    if (score >= 1.5) return '很差'
    return '不忍直视'
  }
}
