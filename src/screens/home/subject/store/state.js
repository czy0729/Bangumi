/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-11 20:30:07
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE } from './ds'

export default class State extends Store {
  state = observable({
    ...EXCLUDE_STATE,
    epsReverse: false, // 章节是否倒序
    watchedEps: '', // 普通条目章节
    filterEps: 0, // 筛选章节的开头
    filterScores: [], // 吐槽分数分组
    bangumiInfo: {
      sites: [], // 动画在线地址
      type: '' // 动画类型
    },

    // 播放源
    epsData: {
      _loaded: false
    },

    // 缩略图
    epsThumbs: [],
    epsThumbsHeader: {},
    _loaded: false
  })
}
