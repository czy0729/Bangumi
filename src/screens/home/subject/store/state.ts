/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-11 16:04:42
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE } from './ds'
import { Params } from './types'

export default class State extends Store {
  params: Params

  state = observable({
    ...EXCLUDE_STATE,

    /** 章节是否倒序 */
    epsReverse: false,

    /** 普通条目章节 */
    watchedEps: '',

    /** 筛选章节的开头 */
    filterEps: 0,

    /** 吐槽分数分组 */
    filterScores: [],

    /** bangumi-data 中找到的 item */
    bangumiInfo: {
      /** 动画在线地址 */
      sites: [],

      /** 动画类型 */
      type: ''
    },

    /** 播放源 */
    epsData: {
      _loaded: false
    },

    /** 缩略图 */
    epsThumbs: [],

    /** 缩略图请求 header */
    epsThumbsHeader: {} as {
      Referer?: any
    },

    /** 页面 store 初始化完成 */
    _loaded: false as boolean | number
  })
}
