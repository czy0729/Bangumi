/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 16:21:14
 */
import { rakuenStore, usersStore } from '@stores'
import { getTimestamp } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

let loadedFavor = false

class ScreenTopic extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60
    const commonState = await this.getStorage(NAMESPACE)

    try {
      const state: typeof STATE = {
        ...(await this.getStorage(this.namespace)),
        ...EXCLUDE_STATE,
        reverse: commonState.reverse,
        _loaded: needFetch ? current : _loaded
      }

      // 若跳转只显示自己可以更快跳到指定楼层
      if (this.postId) {
        state.filterMe = true
        state.filterFriends = false
      }
      this.setState(state)

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
    } catch (error) {
      this.setState({
        ...EXCLUDE_STATE,
        reverse: commonState.reverse,
        _loaded: needFetch ? current : _loaded
      })
    }

    return true
  }
}

export default ScreenTopic
