/*
 * @Author: czy0729
 * @Date: 2023-03-31 02:05:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-21 19:09:45
 */
import { rakuenStore, subjectStore } from '@stores'
import { getTimestamp, omit } from '@utils'
import { get, update } from '@utils/kv'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { H } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 获取帖子内容和留言 */
  fetchTopic = () => {
    return rakuenStore.fetchTopic({
      topicId: this.topicId
    })
  }

  /** 章节内容 */
  fetchEpFormHTML = () => {
    const epId = this.topicId.replace('ep/', '')
    return subjectStore.fetchEpFormHTML(epId)
  }

  /** 装载云端帖子缓存数据 */
  fetchTopicFromOSS = async () => {
    if (this.topic._loaded) return

    try {
      const data: any = await get(`topic_${this.topicId.replace('/', '_')}`)

      // 云端没有数据存在, 本地计算后上传
      if (!data) {
        this.updateTopicThirdParty()
        return
      }

      const { ts, topic, comments } = data
      const _loaded = getTimestamp()
      if (typeof topic === 'object' && typeof comments === 'object') {
        const state: any = {
          topic: {
            ...topic,
            _loaded
          }
        }

        // 网页版修改了帖子回复的样式导致楼层获取失败, 需要排除这部分的缓存
        if (comments?.list?.[0]?.floor) {
          // 历史遗漏问题, 观察到有倒序的快照, 暂不使用这种快照
          const needReverse =
            comments.list.length >= 2 &&
            comments.list[0].floor.localeCompare(comments.list[1].floor) === 1
          if (!needReverse) {
            state.comments = {
              ...comments,
              _loaded
            }
          }
        }

        this.setState(state)
      }

      if (_loaded - ts >= H * 4) this.updateTopicThirdParty()
    } catch (error) {}
  }

  /** 上传帖子预数据 */
  updateTopicThirdParty = () => {
    setTimeout(() => {
      const { _loaded, formhash } = this.topic

      // formhash 是登录并且可操作条目的用户的必有值
      if (!_loaded || !formhash) return

      try {
        update(`topic_${this.topicId.replace('/', '_')}`, {
          topic: omit(this.topic, ['formhash', 'lastview', 'close', '_loaded']),
          comments: {
            ...this.comments,
            list: this.comments.list
              .filter((_item, index) => index < 16)
              .map(item => ({
                ...omit(item, ['replySub', 'erase', 'message', 'sub']),
                message: decoder(item.message),
                sub: item.sub
                  .filter((_i, idx: number) => idx < 8)
                  .map(i => ({
                    ...omit(i, ['replySub', 'erase', 'message']),
                    message: decoder(i.message)
                  }))
              }))
          }
        })
      } catch (error) {}
    }, 10000)
  }
}
