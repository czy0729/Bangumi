/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:31:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 13:31:57
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { getPreview, matchMovie, search } from '@utils/douban'
import { HOST } from '@constants'
import { Params } from './types'

const NAMESPACE = 'ScreenPreview'

export default class ScreenPreview extends store {
  params: Params

  state = observable({
    epsThumbs: [],
    epsThumbsHeader: {},
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(this.namespace)) || {}
    this.setState({
      ...state,
      _loaded: true
    })

    if (!this.state.epsThumbs.length) {
      this.fetchMovieFromDouban()
    }
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.subjectId}` as const
  }

  @computed get url() {
    return `${HOST}/preview/${this.subjectId}`
  }

  // -------------------- method --------------------
  /** 从donban匹配条目, 并获取官方剧照信息 */
  fetchMovieFromDouban = async () => {
    const { cn, jp } = this.params
    const q = cn || jp
    if (q) {
      const result = await search(q)
      const doubanId = matchMovie(q, result, jp)
      const preview = await getPreview(doubanId, undefined, 40)
      if (preview.data.length) {
        this.setState({
          epsThumbs: preview.data.reverse(),
          epsThumbsHeader: {
            Referer: preview.referer
          }
        })
        this.setStorage(this.namespace)
      }
    }
  }
}
