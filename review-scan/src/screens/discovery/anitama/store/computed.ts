/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-07 22:28:29
 */
import { computed } from 'mobx'
import { discoveryStore } from '@stores'
import { MODEL_NEWS } from '@constants'
import State from './state'

export default class Computed extends State {
  /** 站点 */
  @computed get label() {
    return MODEL_NEWS.getLabel(this.state.type)
  }

  /** 资讯 */
  @computed get article() {
    const { page } = this.state
    switch (this.label) {
      case '和邪社':
        return discoveryStore.hexiesheTimeline(page)

      case '机核GCORES':
        return discoveryStore.gcoresTimeline(page)

      default:
        return discoveryStore.dmzjTimeline(page)
    }
  }

  /** 地址 */
  @computed get url() {
    switch (this.label) {
      case '和邪社':
        return 'https://www.hexieshe.cn'

      case '机核GCORES':
        return 'https://www.gcores.com/news'

      default:
        return 'https://m.news.dmzj.com'
    }
  }
}
