/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:17:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:17:41
 *
 * 字典 - 条目 / 章节 / 收藏
 */
import { Model } from './utils'

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

/** 章节类型 (本篇 = 0 特别篇 = 1 OP = 2 ED = 3 预告/宣传/广告 = 4 MAD = 5 其他 = 6) */

export const EP_TYPE = [
  {
    label: '普通',
    value: '0'
  },
  {
    label: 'SP',
    value: '1'
  }
] as const

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
