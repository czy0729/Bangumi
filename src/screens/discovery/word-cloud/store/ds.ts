/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 15:11:06
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  title: '',
  show: false,
  fetching: 0
}

export const STATE = {
  ...EXCLUDE_STATE,
  data: {
    list: [] as [string, string][],
    _loaded: 0 as Loaded
  },
  _loaded: false as Loaded
}

/** 排除掉一些无意义的谓词 (视使用情况持续更新) */
export const FILTER_WORD = ['bgm', '一部', '实在', '感觉', '最后', '有点', '有种', '比较', '确实']
