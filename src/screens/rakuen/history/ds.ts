/*
 * @Author: czy0729
 * @Date: 2023-07-03 10:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:54:27
 */
import { Loaded } from '@types'

export const COMPONENT = 'RakuenHistory'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const DS = ['小组', '条目', '章节', '人物'] as const

export const STATE = {
  favor: false,
  topics: {},
  type: '小组' as (typeof DS)[number],
  _loaded: false as Loaded
}
