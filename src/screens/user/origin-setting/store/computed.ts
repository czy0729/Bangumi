/*
 * @Author: czy0729
 * @Date: 2024-09-13 03:27:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 页面派生数据
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { getItemKey, getOriginConfig } from '../utils'
import State from './state'

export default class Computed extends State {
  /** 合并后的源头配置 (预设 + 自定义, 按分类) */
  @computed get data() {
    return getOriginConfig(this.state.data)
  }

  @computed get isLogin() {
    return !!userStore.userInfo.id
  }

  /** 正在编辑条目的定位 key, 未编辑时为空 (预设项用 id, 自定义项用 uuid) */
  @computed get editingKey() {
    const { type, item } = this.state.edit
    if (!type) return ''

    return getItemKey(type, item.id, item.uuid)
  }

  /** 正在新建的分类, 未新建时为空 */
  @computed get creatingType() {
    const { type, item } = this.state.edit
    if (!type || item.id || item.uuid) return ''

    return type
  }
}
