/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:26:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-07 22:28:42
 */
import { discoveryStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 资讯 */
  fetchList = () => {
    const { page } = this.state

    switch (this.label) {
      case '机核GCORES':
        return discoveryStore.fetchGCORESTimeline(page)

      case '翼萌动漫':
        return discoveryStore.fetchYiMengTimeline(page)

      default:
        return
    }
  }
}
