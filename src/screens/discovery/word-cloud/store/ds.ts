/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 07:12:33
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
  data: {
    list: [] as [string, string][],
    _loaded: 0 as Loaded
  },
  trend: 0,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}

/** 排除掉一些无意义的谓词 (视使用情况持续更新) */
export const FILTER_WORD = ['一部', '实在', '感觉', '有点', '有种', '比较', '确实']
