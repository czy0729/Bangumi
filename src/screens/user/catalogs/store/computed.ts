/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:34:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 15:16:22
 *
 * 目录派生: 用户与标签页
 */
import { computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { HTML_USERS_CATALOGS } from '@constants'
import { TABS } from '../ds'
import State from './state'

import type { TabsKey } from '../types'

export default class Computed extends State {
  /** 用户 ID, 未指定时取当前登录用户 */
  @computed get userId() {
    return this.params.userId || userStore.myId
  }

  /** 用户目录的网页地址 */
  @computed get url() {
    return HTML_USERS_CATALOGS(this.userId)
  }

  /** 当前标签页的存取键 (缓存页码越界时回落到第一个标签) */
  @computed get key() {
    return TABS[this.state.page]?.key ?? TABS[0].key
  }

  /** 指定标签页的目录列表 */
  catalogs(key: TabsKey) {
    return usersStore.catalogs(this.userId, key === 'collect')
  }

  /** 埋点 */
  @computed get hm() {
    return [this.url, 'Catalogs'] as const
  }
}
