/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 15:11:32
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { HTMLDecode } from '@utils'
import { FROZEN_ARRAY } from '@constants'
import { MAX_PAGE, PAGE_LIMIT } from '../ds'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.subjectId}`
  }

  /** 条目 ID */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 条目信息 */
  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /** 条目吐槽 */
  @computed get comment() {
    return subjectStore.subjectComments(this.subjectId)
  }

  /** 吐槽纯文本 */
  @computed get plainText() {
    let text = ''
    this.comment.list.forEach((item, index) => {
      if (index >= MAX_PAGE * PAGE_LIMIT) return

      text += HTMLDecode(item.comment)
    })
    return text
  }

  /** 点击词云后选中的吐槽 */
  @computed get selectedComment() {
    const { list } = this.comment
    if (!list.length) return FROZEN_ARRAY

    const { title } = this.state
    return list.filter(item => item.comment.includes(title))
  }
}
