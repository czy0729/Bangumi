/*
 * @Author: czy0729
 * @Date: 2026-08-31 06:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 06:58:34
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import State from '../state'
import { EXCLUDE_STATE, NAMESPACE } from '../ds'

import type { SnapshotId, TrendId } from '../../types'

/** 基础派生: 页面参数与本地化 */
export default class Base extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 条目 ID */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 帖子 ID */
  @computed get topicId() {
    return this.params.topicId
  }

  /** 角色 ID */
  @computed get monoId() {
    return this.params.monoId
  }

  /** 用户 ID */
  @computed get userId() {
    if (this.subjectId || this.topicId || this.monoId) return ''
    return this.params.userId || userStore.myId || ''
  }

  @computed get id() {
    return this.subjectId || this.topicId || this.monoId || this.userId || ''
  }

  /** 快照 ID */
  @computed get snapshotId() {
    return `extract_${String(this.id).replace(/\//g, '_')}` as SnapshotId
  }

  /** 趋势 ID */
  @computed get trendId() {
    return `trend_${String(this.id).replace(/\//g, '_')}` as TrendId
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return this.userId ? NAMESPACE : `${NAMESPACE}|${this.id}`
  }

  /** 浏览器地址 */
  @computed get url() {
    return `word_cloud/${String(this.id).replace(/\//g, '_')}`
  }

  @computed get hm() {
    return [this.url, 'WordCloud']
  }
}
