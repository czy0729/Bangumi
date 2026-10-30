/*
 * @Author: czy0729
 * @Date: 2024-08-23 10:31:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 19:57:31
 *
 * 吐槽页派生数据
 */
import { computed } from 'mobx'
import { timelineStore } from '@stores'
import { HOST } from '@constants'
import State from './state'

export default class Computed extends State {
  /** 吐槽 ID */
  @computed get id() {
    return this.params.sayId || this.params.id
  }

  /** 是否创建 */
  @computed get isNew() {
    return !this.id
  }

  /** 吐槽 */
  @computed get say() {
    const data = timelineStore.say(this.id)
    return {
      ...data,
      list: data.list.slice().reverse()
    }
  }

  /** 主吐槽 (store 里的列表是正序, 主吐槽在首位), 只有它带表单授权码 */
  @computed get sayMain() {
    const { list } = timelineStore.say(this.id)
    return list[0]
  }

  /** 表单提交唯一码, 已有吐槽时优先用主吐槽解析出的值 */
  @computed get formhash() {
    return this.sayMain?.formhash || timelineStore.formhash
  }

  /** 对应网址 */
  @computed get url() {
    return this.isNew
      ? `${HOST}/timeline?type=say`
      : `${HOST}/user/${this.params.userId}/timeline/status/${this.id}`
  }

  /** 埋点 */
  @computed get hm() {
    return [this.url, 'Say'] as const
  }
}
