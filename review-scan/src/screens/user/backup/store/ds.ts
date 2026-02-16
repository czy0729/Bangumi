/*
 * @Author: czy0729
 * @Date: 2022-12-06 05:47:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:07:39
 */
import { Loaded, SubjectId } from '@types'
import { COMPONENT } from '../ds'
import { Item } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  progress: {
    fetching: false,
    message: '',
    current: 0,
    total: 0
  },

  /** 是否显示导入框 */
  modal: false as boolean,

  /** 导入数据 */
  upload: {} as Record<SubjectId, Item>,

  /** 置底数据 */
  bottom: {
    current: 0
  }
}

export const STATE = {
  ...EXCLUDE_STATE,
  anime: [] as Item[],
  book: [] as Item[],
  music: [] as Item[],
  game: [] as Item[],
  real: [] as Item[],
  last: 0,
  includeUrl: false,
  includeImage: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
