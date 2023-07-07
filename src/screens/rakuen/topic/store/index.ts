/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-02 10:17:51
 */
import { rakuenStore, usersStore } from '@stores'
import { getTimestamp } from '@utils'
import { NAMESPACE, EXCLUDE_STATE } from './ds'
import Action from './action'

let loadedFavor = false

class ScreenTopic extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60
    const commonState = (await this.getStorage(NAMESPACE)) || {}

    try {
      const state = (await this.getStorage(this.namespace)) || {}
      this.setState({
        ...state,
        ...EXCLUDE_STATE,
        reverse: commonState.reverse,
        _loaded: needFetch ? current : _loaded
      })

      this.fetchTopicFromOSS()

      if (!loadedFavor) {
        rakuenStore.getFavor()
        loadedFavor = true
      }

      if (needFetch) {
        // 章节需要请求章节详情
        if (this.isEp) {
          this.fetchEpFormHTML()
        } else {
          rakuenStore.checkIsFavor(this.topicId)
        }

        usersStore.updateFriendsMap()

        // 本地帖子过来不主动请求
        const { _noFetch } = this.params
        if (!_noFetch) {
          await this.fetchTopic()
          setTimeout(() => {
            this.cacheAvatars()
          }, 0)
          return true
        }
      }

      return true
    } catch (error) {
      this.setState({
        ...EXCLUDE_STATE,
        reverse: commonState.reverse,
        _loaded: needFetch ? current : _loaded
      })
      return true
    }
  }
}

export default ScreenTopic
