/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:10:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:32:05
 *
 * 维基人页面的组件标识与筛选标签常量
 */
import type { Loaded } from '@types'
import type { LastIndex, RelationIndex, TopIndex, TypeIndex } from './types'

export const COMPONENT = 'Wiki'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  /** 顶部标签下标 */
  top: 2 as TopIndex,

  /** 编辑标签下标 */
  type: 0 as TypeIndex,

  /** 关联标签下标 */
  relation: 0 as RelationIndex,

  /** 入库标签下标 */
  last: 1 as LastIndex,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

/** 顶部标签下标与子标签下标的组合 → 数据 key */
export const KEYS = {
  '0|0': 'all',
  '0|1': 'lock',
  '0|2': 'merge',
  '0|3': 'crt',
  '0|4': 'prsn',
  '0|5': 'ep',
  '1|0': 'relation',
  '1|1': 'subjectPerson',
  '1|2': 'subjectCrt',
  '2|0': 'all',
  '2|1': 'anime',
  '2|2': 'book',
  '2|3': 'music',
  '2|4': 'game',
  '2|5': 'real'
} as const

/** 计数块的名称, 下标与 counts 一一对应 */
export const LABEL_DS = [
  '全部条目',
  '动画',
  '书籍',
  '音乐',
  '游戏',
  '三次元',
  '章节',
  '角色',
  '人物',
  '编辑'
] as const

/** 顶部标签 */
export const TOP_DS = ['编辑', '关联', '入库'] as const

/** 编辑标签 */
export const TYPE_DS = ['条目', '锁定', '合并', '角色', '人物', '章节'] as const

/** 关联标签 */
export const RELATION_DS = ['条目关联', '人物关联', '角色关联'] as const

/** 入库标签 */
export const LAST_DS = ['全部', '动画', '书籍', '音乐', '游戏', '三次元'] as const
