/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:47:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 08:15:26
 */
import { SUBJECT_TYPE } from '@constants'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenDiscoveryBlog'

export const STATE = {
  /** tab 的 page */
  page: 0,

  /** 是否显示列表, 制造切页效果 */
  show: true,

  /** 当前页数 */
  currentPage: {
    all: 1,
    anime: 1,
    book: 1,
    game: 1,
    music: 1,
    real: 1
  },

  /** 输入框值 */
  ipt: {
    all: '1',
    anime: '1',
    book: '1',
    game: '1',
    music: '1',
    real: '1'
  },
  _loaded: false as Loaded
}

export const TABS = [
  {
    title: '全部',
    key: 'all'
  },
  ...SUBJECT_TYPE.map(item => ({
    title: item.title,
    key: item.label
  }))
] as const
