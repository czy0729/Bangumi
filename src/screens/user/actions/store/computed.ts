/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 自定义跳转页派生数据
 */
import { computed } from 'mobx'
import { desc } from '@utils'
import State from './state'

export default class Computed extends State {
  /** 条目 Id */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 是否正在新建 */
  @computed get isCreating() {
    const { edit } = this.state
    return edit.show && edit.uuid === ''
  }

  /** 正在编辑的条目 Id (未编辑时为空) */
  @computed get editingUuid() {
    const { edit } = this.state
    return edit.show ? edit.uuid : ''
  }

  /** 跳转列表 (生效的优先, 再按排序值倒序) */
  @computed get data() {
    const { data } = this.state
    return data.data
      .slice()
      .sort((a, b) => desc(Number(a.sort) || 0, Number(b.sort) || 0))
      .sort((a, b) => desc(a.active, b.active))
  }
}
