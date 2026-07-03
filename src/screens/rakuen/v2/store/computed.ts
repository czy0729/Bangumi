/*
 * @Author: czy0729
 * @Date: 2024-05-16 19:51:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 20:38:15
 */
import { computed } from 'mobx'
import { _, rakuenStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import { MODEL_RAKUEN_TYPE, MODEL_RAKUEN_TYPE_GROUP, MODEL_RAKUEN_TYPE_MONO } from '@constants'
import { TABS } from '../ds'
import { filterRakuenList, shouldFilterRakuen } from './utils'
import State from './state'

import type {
  RakuenType,
  RakuenTypeGroup,
  RakuenTypeGroupCn,
  RakuenTypeMono,
  RakuenTypeMonoCn,
  TopicId
} from '@types'

export default class Computed extends State {
  /** Tab navigationState */
  @computed get navigationState() {
    return {
      index: this.state.page,
      routes: TABS
    }
  }

  /** 页码背景颜色 */
  @computed get backgroundColor() {
    return _.select(_.colorPlain, _._colorDarkModeLevel1)
  }

  /** 超展开列表 */
  rakuen = computedFn((type: RakuenType | RakuenTypeMono | RakuenTypeGroup) => {
    const rakuen = type === 'hot' ? rakuenStore.hot : rakuenStore.rakuen(this.state.scope, type)
    if (!shouldFilterRakuen()) return rakuen

    return {
      ...rakuen,
      list: filterRakuenList(rakuen.list)
    }
  })

  /** 帖子历史查看记录 */
  readed = computedFn((topicId: TopicId) => {
    return rakuenStore.readed(topicId)
  })

  /** 计算实际 type */
  type = computedFn((page: number) => {
    const { title } = TABS[page]
    if (title === '小组') {
      const { group } = this.state
      const label = MODEL_RAKUEN_TYPE_GROUP.getLabel<RakuenTypeGroupCn>(group)
      return MODEL_RAKUEN_TYPE_GROUP.getValue<RakuenTypeGroup>(label)
    }

    if (title === '人物') {
      const { mono } = this.state
      const label = MODEL_RAKUEN_TYPE_MONO.getLabel<RakuenTypeMonoCn>(mono)
      return MODEL_RAKUEN_TYPE_MONO.getValue<RakuenTypeMono>(label)
    }

    return MODEL_RAKUEN_TYPE.getValue<RakuenType>(title)
  })

  /** 导航栏标题 */
  @computed get title() {
    return TABS[this.state.page].title
  }

  /** 获取虚拟人物Id */
  characterId(href: string) {
    if (href.includes('/crt/')) return href.split('/crt/')[1]
    return 0
  }

  /** 是否收藏 */
  isFavor = computedFn((topicId: TopicId) => {
    return rakuenStore.favorV2(topicId)
  })
}
