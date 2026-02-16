/*
 * @Author: czy0729
 * @Date: 2024-06-04 15:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 13:31:13
 */
import { computed } from 'mobx'
import { rakuenStore, systemStore, userStore } from '@stores'
import { CommentsItemWithSub } from '@stores/rakuen/types'
import { desc } from '@utils'
import { Id, TopicId } from '@types'
import State from './state'
import { COMMENT_LIMIT, COMMENT_LIMIT_ADVANCE } from './ds'

export default class Computed extends State {
  /** 需要把 rakuenStore.state.topic 和 rakuenStore.state.cloudTopic key 值合并计算 */
  @computed get keys() {
    const { topic, cloudTopic } = rakuenStore.state
    return Array.from(new Set([...Object.keys(topic), ...Object.keys(cloudTopic)]))
      .filter((topicId: TopicId) => {
        // 不知道哪里有问题, 有时会出现 undefined 的 key 值, 过滤掉
        if (!topicId.includes('group/') || topicId.includes('undefined')) return false
        if (!/^group\/(\d+)$/.test(topicId)) return false
        return true
      })
      .sort((a, b) => desc(parseInt(a.split('/')?.[1]), parseInt(b.split('/')?.[1])))
  }

  /** 本地缓存帖子 */
  @computed get sections() {
    const sections = []
    const map = {}
    this.keys.forEach(item => {
      const target = rakuenStore.state.topic[item] || rakuenStore.state.cloudTopic[item]
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
  isFavor(topicId: TopicId) {
    return computed(() => rakuenStore.favorV2(topicId)).get()
  }

  /** 收藏键值数组 */
  @computed get list(): string[] {
    const { type } = this.state
    const { favorV2 } = rakuenStore.state
    const list = []
    Object.keys(favorV2).map(key => {
      if (favorV2[key]) list.push(key)
    })

    return list
      .filter(item => {
        if (type === '小组') return item.includes('group/')
        if (type === '条目') return item.includes('subject/')
        if (type === '章节') return item.includes('ep/')
        if (type === '人物') return item.includes('crt/') || item.includes('prsn/')
        if (type === '日志') return item.includes('blog/')
        return item.includes('group/')
      })
      .sort((a, b) => desc(parseInt(a.split('/')?.[1]), parseInt(b.split('/')?.[1])))
  }

  /** 云端帖子数据 */
  topic(key: string) {
    return computed(() => {
      return this.state.topics[`favor_${key.replace('/', '_')}`] || null
    }).get()
  }

  /** 我回复的帖子 */
  @computed get myReply() {
    return rakuenStore.group('my_reply', this.state.replyPage)
  }

  /** 热门帖子 */
  @computed get collectRank() {
    const { collectRank, collectRankSort } = this.state
    if (collectRankSort === '收藏数') {
      return collectRank.filter(item => item.collect_count >= 10)
    }

    return collectRank
      .filter(item => item.collect_count >= 10)
      .sort(
        (a, b) => Number(b.topic_id.split('/')?.[1] || 0) - Number(a.topic_id.split('/')?.[1] || 0)
      )
  }

  /** 帖子历史查看记录 */
  readed(topicId: TopicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  /** 帖子头像 */
  avatar(topicId: TopicId) {
    return computed(() => {
      return rakuenStore.topic(topicId).avatar
    }).get()
  }

  /** 我的回复数统计 */
  comment(topicId: TopicId) {
    return computed(() => {
      const limit = systemStore.isAdvance ? COMMENT_LIMIT_ADVANCE : COMMENT_LIMIT
      const items: {
        id: Id
        floor: string
        time: string
        message: string
      }[] = []

      rakuenStore
        .comments(topicId)
        .list.slice()
        .reverse()
        .forEach((item: CommentsItemWithSub) => {
          if (items.length >= limit) return

          if (item.userId === userStore.myId && !item.message.includes('删除了回复')) {
            items.push({
              id: item.id,
              floor: item.floor,
              time: item.time,
              message: item.message
            })
            if (items.length >= limit) return
          }

          item.sub.forEach(item => {
            if (items.length >= limit) return

            if (item.userId === userStore.myId && !item.message.includes('删除了回复')) {
              items.push({
                id: item.id,
                floor: item.floor,
                time: item.time,
                message: item.message
              })
              if (items.length >= limit) return
            }
          })
        })

      return items
    }).get()
  }
}
