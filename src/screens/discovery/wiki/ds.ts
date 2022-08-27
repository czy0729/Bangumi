/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:10:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 21:29:10
 */
export const NAMESPACE = 'ScreenWiki'

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

export const TOP_DS = ['编辑', '关联', '入库'] as const

export const TYPE_DS = ['条目', '锁定', '合并', '角色', '人物', '章节'] as const

export const RELATION_DS = ['条目关联', '人物关联', '角色关联'] as const

export const LAST_DS = ['全部', '动画', '书籍', '音乐', '游戏', '三次元'] as const
