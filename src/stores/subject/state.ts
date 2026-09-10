/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:15:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 05:25:13
 */
import { observable } from 'mobx'
import { postTask, titleCase } from '@utils'
import { getBucketId, trimBucket } from '@utils/bucket'
import { logger } from '@utils/dev'
import Store from '@utils/store'
import { LOADED, NAMESPACE, STATE } from './init'
import {
  EP_V2_LIMIT,
  RANK_LIMIT,
  SUBJECT_BUCKET_LIMIT,
  SUBJECT_COMMENTS_BUCKET_LIMIT,
  SUBJECT_FORM_HTML_BUCKET_LIMIT,
  SUBJECT_FROM_OSS_LIMIT,
  SUBJECT_V2_BUCKET_LIMIT,
  VIB_LIMIT
} from './utils'

import type { SubjectId } from '@types'

type CacheKey =
  | keyof typeof LOADED
  | `subject${number}`
  | `subjectFormHTML${number}`
  | `subjectV2${number}`
  | `subjectComments${number}`

export default class State extends Store<typeof STATE> {
  private _namespace = NAMESPACE
  private _loaded = LOADED

  state = observable(STATE)

  init = async (key: CacheKey, isAsync: boolean = false) => {
    if (!key) return false
    if (this._loaded[key]) return true

    if (!isAsync) {
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

  initSubjectV2 = async (subjectIds: SubjectId[]) => {
    const keys = {}
    subjectIds.forEach(subjectId => (keys[`subjectV2${getBucketId(subjectId)}`] = true))

    const cacheKeys = Object.keys(keys).filter(item => !this._loaded[item])
    await this.readStorage(cacheKeys, NAMESPACE)

    cacheKeys.forEach(item => (this._loaded[item] = true))
    return cacheKeys as `subjectV2${number}`[]
  }

  /** 取分桶容量上限, 非分桶 key 返回 0 */
  private getBucketLimit = (key: string) => {
    if (/^subjectFormHTML\d+$/.test(key)) return SUBJECT_FORM_HTML_BUCKET_LIMIT
    if (/^subjectComments\d+$/.test(key)) return SUBJECT_COMMENTS_BUCKET_LIMIT
    if (/^subjectV2\d+$/.test(key)) return SUBJECT_V2_BUCKET_LIMIT
    if (/^subject\d+$/.test(key)) return SUBJECT_BUCKET_LIMIT

    /**
     * 非分桶 key (按条目 id 增长的普通对象)
     * - 只处理条目带 _loaded 的, 淘汰时能按时间保留最新
     * - epStatus / nsfw / commentTrack 等没有可判定的时间信息, 贸然淘汰会把刚写入的条目丢掉,
     *   下次用到又会重新请求写回, 反而失去缓存意义, 故不做裁剪
     */
    if (key === 'subjectFromOSS') return SUBJECT_FROM_OSS_LIMIT
    if (key === 'epV2') return EP_V2_LIMIT
    if (key === 'vib') return VIB_LIMIT
    if (key === 'rank') return RANK_LIMIT

    return 0
  }

  /**
   * 分桶按容量淘汰 (按 _loaded 保留最新)
   * - 桶内含 HTML 解析结果 / eps 等大数组, 不加界会随浏览条目数持续增长
   * - 淘汰条目下次用到时会重新请求 (对齐 rakuen 分桶的既有做法)
   */
  private trimBucketByLimit = (key: string) => {
    const limit = this.getBucketLimit(key)
    if (!limit) return

    const bucket = this.state[key] as Record<string, { _loaded?: number }>
    if (!bucket || typeof bucket !== 'object') return

    trimBucket(bucket, limit, item => Number(item?._loaded) || 0)
  }

  save = (key: CacheKey, data?: unknown) => {
    this.trimBucketByLimit(key)

    return this.setStorage(key, data, NAMESPACE)
  }

  log = (...arg: unknown[]) => {
    logger.log(`${titleCase(this._namespace)}Store`, ...arg)
  }

  error = (...arg: unknown[]) => {
    logger.error(`${titleCase(this._namespace)}Store`, ...arg)
  }
}
