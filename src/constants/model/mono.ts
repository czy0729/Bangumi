/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:13:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:13:24
 *
 * 字典 - 人物
 */
import { Model } from './utils'

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

/** 角色外层排序（按角色ID或内层条目ID最大/最小值） */

export const MONO_VOICES_OUTER_ORDERBY = [
  {
    label: '默认',
    value: ''
  },
  {
    label: '角色ID↓',
    value: 'id_desc'
  },
  {
    label: '角色ID↑',
    value: 'id_asc'
  },
  {
    label: '条目ID最大↓',
    value: 'subject_max_desc'
  },
  {
    label: '条目ID最小↑',
    value: 'subject_min_asc'
  }
] as const

/** 角色外层排序 */
export const MODEL_MONO_VOICES_OUTER_ORDERBY = new Model(
  MONO_VOICES_OUTER_ORDERBY,
  'MONO_VOICES_OUTER_ORDERBY'
)

/** 角色内层排序（按条目ID） */

export const MONO_VOICES_INNER_ORDERBY = [
  {
    label: '默认',
    value: ''
  },
  {
    label: '条目ID↓',
    value: 'id_desc'
  },
  {
    label: '条目ID↑',
    value: 'id_asc'
  }
] as const

/** 角色内层排序 */
export const MODEL_MONO_VOICES_INNER_ORDERBY = new Model(
  MONO_VOICES_INNER_ORDERBY,
  'MONO_VOICES_INNER_ORDERBY'
)

/** 搜索类型 */
