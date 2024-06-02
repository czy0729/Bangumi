/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:31:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-03 07:08:55
 */
import { computed, observable } from 'mobx'
import { getPreview, matchMovie, search } from '@utils/douban'
import store from '@utils/store'
import { HOST } from '@constants'
import { NAMESPACE, STATE } from './ds'
import { Params } from './types'

export default class ScreenPreview extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(this.namespace)),
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
  /** 从 donban 匹配条目, 并获取官方剧照信息 */
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
