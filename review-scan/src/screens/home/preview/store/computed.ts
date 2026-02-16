/*
 * @Author: czy0729
 * @Date: 2024-09-07 01:38:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:44:41
 */
import { computed } from 'mobx'
import { cnjp } from '@utils'
import { HOST } from '@constants'
import State from './state'
import { NAMESPACE } from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace)
  }

  /** 条目 id */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.subjectId}` as const
  }

  /** 条目名称 */
  @computed get name() {
    return cnjp(this.params?.cn, this.params?.jp) || ''
  }

  /** 预览图数组 */
  @computed get data(): string[] {
    try {
      const { _images } = this.params
      if (_images) return JSON.parse(_images)
    } catch (error) {}
    return []
  }

  /** 预览图请求头 */
  @computed get headers(): {
    Referer?: string
  } {
    try {
      const { _headers } = this.params
      if (_headers) return JSON.parse(_headers)
    } catch (error) {}
    return {}
  }

  /** 地址 */
  @computed get url() {
    return `${HOST}/preview/${this.subjectId}`
  }

  @computed get hm() {
    return [this.url, 'Preview']
  }
}
