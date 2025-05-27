/*
 * @Author: czy0729
 * @Date: 2021-06-26 06:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 17:30:03
 */
import { ADV_YEAR } from '@utils/subject/adv'
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  query: {
    first: '',
    year: ADV_YEAR[0],
    dev: '',
    playtime: '',
    cn: '',
    sort: '评分人数',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
