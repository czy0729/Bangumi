/*
 * @Author: czy0729
 * @Date: 2024-06-04 15:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 05:17:47
 */
import { computed } from 'mobx'
import { rakuenStore, systemStore, userStore } from '@stores'
import { desc } from '@utils'
import { getBucketId } from '@utils/bucket'
import { computedFn } from '@utils/computed-fn'
import State from './state'
import { COMMENT_LIMIT, COMMENT_LIMIT_ADVANCE } from './ds'

import type { CommentsItemWithSub, Topic } from '@stores/rakuen/types'
import type { Id, Sections, TopicId } from '@types'
import type { TopicItem } from '../types'

/**
 * rakuenStore.state 的 topic 分桶视图
 *  - state 的模板索引 key 经 store 类链深层解析后为 error type, 收口为显式类型
 * */
function getTopicBucket(last: number): Record<TopicId, Topic> {
  const state = rakuenStore.state as unknown as Record<`topic${number}`, Record<TopicId, Topic>>
  return state[`topic${last}`] || {}
}

export default class Computed extends State {
  /** 需要把 rakuenStore 分桶 topic 与 cloudTopic key 值合并计算 */
  @computed get keys() {
    const { cloudTopic } = rakuenStore.state
    const topicKeys: string[] = []
    for (let i = 0; i < 1000; i += 1) {
      topicKeys.push(...Object.keys(getTopicBucket(i)))
    }

    return (
      Array.from(new Set([...topicKeys, ...Object.keys(cloudTopic)]))
        // 正则已覆盖 group/ 和 undefined key 的过滤
        .filter(topicId => /^group\/\d+$/.test(topicId))
        .sort((a, b) => desc(parseInt(a.split('/')?.[1]), parseInt(b.split('/')?.[1]))) as TopicId[]
    )
  }

  /** 本地缓存帖子 */
  @computed get sections() {
    const sections: Sections<TopicItem> = []
    const map: Record<string, number> = {}

    this.keys.forEach(item => {
      const last = getBucketId(item)
      const target: Topic = getTopicBucket(last)[item] || rakuenStore.state.cloudTopic[item]
      if (!target?.title || target?.title === 'undefined') return

      const title = (target.time || '').split(' ')[0]
      if (!(title in map)) {
        map[title] = sections.length
        sections.push({
          title,
          data: []
        })
      }
      sections[map[title]].data.push({
        topicId: item,
        ...target
      })
    })

    return sections
  }

  /** 是否收藏 */
  isFavor = computedFn((topicId: TopicId): boolean => {
    // favorV2 经 computedFn 深层类型解析为 error type, 显式收口
    return rakuenStore.favorV2(topicId) as boolean
  })

  /** 收藏键值数组 */
  @computed get list(): TopicId[] {
    const { type } = this.state
    const { favorV2 } = rakuenStore.state
    const typeMap: Record<string, (item: string) => boolean> = {
      小组: item => item.includes('group/'),
      条目: item => item.includes('subject/'),
      章节: item => item.includes('ep/'),
      人物: item => item.includes('crt/') || item.includes('prsn/'),
      日志: item => item.includes('blog/')
    }
    const match = typeMap[type] ?? typeMap['小组']

    return Object.keys(favorV2)
      .filter(key => favorV2[key] && match(key))
      .sort((a, b) => desc(parseInt(a.split('/')?.[1]), parseInt(b.split('/')?.[1]))) as TopicId[]
  }

  /** 云端帖子数据 */
  topic = computedFn((key: string) => {
    return this.state.topics[`favor_${key.replace('/', '_')}`] || null
  })

  /** 我回复的帖子 */
  @computed get myReply() {
    return rakuenStore.group('my_reply', this.state.replyPage)
  }

  /** 热门帖子 */
  @computed get collectRank() {
    const { collectRank, collectRankSort } = this.state
    const filtered = collectRank.filter(item => item.collect_count >= 10)
    if (collectRankSort === '收藏数') return filtered

    return filtered.sort(
      (a, b) => Number(b.topic_id.split('/')?.[1] || 0) - Number(a.topic_id.split('/')?.[1] || 0)
    )
  }

  /** 帖子历史查看记录 */
  readed = computedFn((topicId: TopicId) => {
    return rakuenStore.readed(topicId)
  })

  /** 帖子头像 */
  avatar = computedFn((topicId: TopicId) => {
    return rakuenStore.topic(topicId).avatar
  })

  /** 我的回复数统计 */
  comment = computedFn((topicId: TopicId) => {
    const limit = systemStore.isAdvance ? COMMENT_LIMIT_ADVANCE : COMMENT_LIMIT
    const items: { id: Id; floor: string; time: string; message: string }[] = []

    const list = rakuenStore.comments(topicId).list
    for (let i = list.length - 1; i >= 0; i--) {
      if (items.length >= limit) break

      const item: CommentsItemWithSub = list[i]
      if (item.userId === userStore.myId && !item.message.includes('删除了回复')) {
        items.push({
          id: item.id,
          floor: item.floor,
          time: item.time,
          message: item.message
        })
        if (items.length >= limit) break
      }

      const sub = item.sub
      for (let j = 0; j < sub.length; j++) {
        if (items.length >= limit) break

        const subItem = sub[j]
        if (subItem.userId === userStore.myId && !subItem.message.includes('删除了回复')) {
          items.push({
            id: subItem.id,
            floor: subItem.floor,
            time: subItem.time,
            message: subItem.message
          })
          if (items.length >= limit) break
        }
      }
    }

    return items
  })
}
