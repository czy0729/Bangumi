/*
 * @Author: czy0729
 * @Date: 2024-05-16 19:51:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-10 04:05:36
 *
 * 超展开页派生数据
 */
import { computed } from 'mobx'
import { _, rakuenStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import {
  MODEL_RAKUEN_TYPE,
  MODEL_RAKUEN_TYPE_ALL,
  MODEL_RAKUEN_TYPE_EP,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO,
  MODEL_RAKUEN_TYPE_SUBJECT
} from '@constants'
import { TABS } from '../ds'
import { filterRakuenList, getDataSourceKey, shouldFilterRakuen } from './utils'
import State from './state'
import { INIT_WATAAME } from './ds'

import type {
  RakuenType,
  RakuenTypeAll,
  RakuenTypeAllCn,
  RakuenTypeEp,
  RakuenTypeEpCn,
  RakuenTypeGroup,
  RakuenTypeGroupCn,
  RakuenTypeMono,
  RakuenTypeMonoCn,
  RakuenTypeSubject,
  RakuenTypeSubjectCn,
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
  rakuen = computedFn(
    (
      type:
        | RakuenType
        | RakuenTypeMono
        | RakuenTypeGroup
        | RakuenTypeSubject
        | RakuenTypeEp
        | RakuenTypeAll
    ) => {
      const key = getDataSourceKey(type)
      const rakuen = key
        ? this.state.wataame._source === key
          ? this.state.wataame
          : INIT_WATAAME
        : rakuenStore.rakuen(
            this.state.scope,
            type as RakuenType | RakuenTypeMono | RakuenTypeGroup
          )
      if (!shouldFilterRakuen()) return rakuen

      return {
        ...rakuen,
        list: filterRakuenList(rakuen.list)
      }
    }
  )

  /** 帖子历史查看记录 */
  readed = computedFn((topicId: TopicId) => {
    return rakuenStore.readed(topicId)
  })

  /** 计算实际 type */
  type = computedFn((page: number) => {
    const { title } = TABS[page]
    if (title === '全部') {
      const { all } = this.state
      const label = MODEL_RAKUEN_TYPE_ALL.getLabel<RakuenTypeAllCn>(all)
      return MODEL_RAKUEN_TYPE_ALL.getValue<RakuenTypeAll>(label) || ''
    }

    if (title === '小组') {
      const { group } = this.state
      const label = MODEL_RAKUEN_TYPE_GROUP.getLabel<RakuenTypeGroupCn>(group)
      return MODEL_RAKUEN_TYPE_GROUP.getValue<RakuenTypeGroup>(label) || 'group'
    }

    if (title === '条目') {
      const { subject } = this.state
      const label = MODEL_RAKUEN_TYPE_SUBJECT.getLabel<RakuenTypeSubjectCn>(subject)
      return MODEL_RAKUEN_TYPE_SUBJECT.getValue<RakuenTypeSubject>(label) || 'subject'
    }

    if (title === '章节') {
      const { ep } = this.state
      const label = MODEL_RAKUEN_TYPE_EP.getLabel<RakuenTypeEpCn>(ep)
      return MODEL_RAKUEN_TYPE_EP.getValue<RakuenTypeEp>(label) || 'ep'
    }

    if (title === '人物') {
      const { mono } = this.state
      const label = MODEL_RAKUEN_TYPE_MONO.getLabel<RakuenTypeMonoCn>(mono)
      return MODEL_RAKUEN_TYPE_MONO.getValue<RakuenTypeMono>(label) || 'mono'
    }

    return MODEL_RAKUEN_TYPE.getValue<RakuenType>(title)
  })

  /** 导航栏标题 */
  @computed get title() {
    return TABS[this.state.page].title
  }

  /** 是否收藏 */
  isFavor = computedFn((topicId: TopicId) => {
    return rakuenStore.favorV2(topicId)
  })
}
