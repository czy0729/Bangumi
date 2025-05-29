/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:27:40
 */
import { rakuenStore, usersStore } from '@stores'
import { getTimestamp } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

let loadedFavor = false

export default class ScreenTopic extends Action {
  init = async () => {
    const now = getTimestamp()
    const { _loaded } = this.state
    const needRefresh = !_loaded || now - Number(_loaded) > 60
    const loadedTime = needRefresh ? now : _loaded
    const commonState = await this.getStorage(NAMESPACE)

    try {
      const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
        this.namespace
      )
      const state: typeof STATE = {
        ...storageData,
        ...EXCLUDE_STATE,
        reverse: commonState.reverse,
        focused: true,
        _loaded: loadedTime
      }

      // 若跳转只显示跳转楼层可以更快跳到指定楼层
      if (this.postId) {
        state.filterType = ''
        state.filterPost = this.postId
      }
      this.setState(state)

      this.fetchTopicFromOSS()
      if (!loadedFavor) {
        rakuenStore.getFavor()
        loadedFavor = true
      }

      if (needRefresh) {
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
        focused: true,
        _loaded: loadedTime
      })
      return true
    }
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
