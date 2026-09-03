/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:15:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:15:47
 *
 * 字典 - 搜索
 */
import { Model } from './utils'

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
    label: '目录',
    value: 'catalog'
  },
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
