/*
 * @Author: czy0729
 * @Date: 2024-07-26 05:13:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-26 05:13:21
 */
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  query: {
    first: '',
    year: 2022,
    begin: '',
    status: '',
    tags: [],
    hd: '',
    sort: '评分人数',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,
  _loaded: false as Loaded
}
