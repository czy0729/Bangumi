/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:31:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:20:17
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { getPreview, matchMovie, search } from '@utils/douban'
import { HOST } from '@constants'
import { NAMESPACE, STATE } from './ds'
import { Params } from './types'

export default class ScreenPreview extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

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
          epsThumbs: preview.data.slice().reverse(),
          epsThumbsHeader: {
            Referer: preview.referer
          }
        })
        this.setStorage(this.namespace)
      }
    }
  }
}
