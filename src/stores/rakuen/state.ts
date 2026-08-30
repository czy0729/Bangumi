/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:20:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 05:35:45
 */
import { observable } from 'mobx'
import { postTask, titleCase } from '@utils'
import { getBucketId, trimBucket } from '@utils/bucket'
import { logger } from '@utils/dev'
import Store from '@utils/store'
import { LOADED, NAMESPACE, STATE } from './init'
import { LIKES_BUCKET_LIMIT, READED_BUCKET_LIMIT, TOPIC_BUCKET_LIMIT } from './utils'

import type { TopicId, BlogId, SubjectId } from '@types'
import type { CacheKey, Readed, Topic } from './types'

export default class State extends Store<typeof STATE> {
  private _namespace = NAMESPACE
  private _loaded = LOADED

  state = observable(STATE)

  init = async (key: CacheKey, async?: boolean) => {
    if (!key) return false

    if (this._loaded[key]) return true

    if (!async) {
      this._loaded[key] = true
      return this.readStorage([key], NAMESPACE)
    }

    postTask(() => {
      if (this._loaded[key]) return

      this._loaded[key] = true
      this.readStorage([key], NAMESPACE)
    }, 0)

    return this._loaded[key]
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- 分桶写入 (merge 单条 -> 容量淘汰 -> 落盘) --------------------

  /** 写入帖子内容桶: 淘汰超限旧条目并联动删除同桶表情 */
  saveTopicBucket = (topicId: TopicId, item: Topic) => {
    const last = getBucketId(topicId)
    const topicKey = `topic${last}` as const
    const likesKey = `likes${last}` as const

    this.setState({
      [topicKey]: {
        [topicId]: item
      }
    })

    const evicted = trimBucket(
      this.state[topicKey] as Record<string, Topic>,
      TOPIC_BUCKET_LIMIT,
      item => Number(item._loaded) || 0
    )
    evicted.forEach(id => {
      delete this.state[likesKey][id]
    })
    // 表情条目无时间戳, 按 id 升序兜底淘汰
    trimBucket(this.state[likesKey] as Record<string, Record<string, unknown>>, LIKES_BUCKET_LIMIT, () => 0)

    this.save(topicKey)
    this.save(likesKey)
  }

  /** 写入表情桶: 容量兜底淘汰后落盘 (item 不传时仅对当前桶做淘汰与落盘) */
  saveLikesBucket = (topicId: TopicId | BlogId | SubjectId, item?: Record<string, unknown>) => {
    const key = `likes${getBucketId(topicId)}` as const

    if (item) {
      this.setState({
        [key]: {
          [topicId]: item
        }
      })
    }
    trimBucket(
      this.state[key] as Record<string, Record<string, unknown>>,
      LIKES_BUCKET_LIMIT,
      () => 0
    )

    this.save(key)
  }

  /** 写入已读信息桶: 容量淘汰后落盘 */
  saveReadedBucket = (topicId: TopicId, item: Readed) => {
    const key = `readed${getBucketId(topicId)}` as const

    this.setState({
      [key]: {
        [topicId]: item
      }
    })
    trimBucket(
      this.state[key] as Record<string, Readed>,
      READED_BUCKET_LIMIT,
      item => Number(item.time) || 0
    )

    this.save(key)
  }

  /** 更新小组缩略图 */
  updateGroupThumb = (name: string, thumb: string) => {
    const key = 'groupThumb'
    this.setState({
      [key]: {
        [name]: thumb
      }
    })
    this.save(key)
  }

  log = (...arg: unknown[]) => {
    logger.log(`${titleCase(this._namespace)}Store`, ...arg)
  }

  error = (...arg: unknown[]) => {
    logger.error(`${titleCase(this._namespace)}Store`, ...arg)
  }
}
