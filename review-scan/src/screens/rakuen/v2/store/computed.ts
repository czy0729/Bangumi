/*
 * @Author: czy0729
 * @Date: 2024-05-16 19:51:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 19:56:07
 */
import { computed } from 'mobx'
import { _, rakuenStore, systemStore, userStore } from '@stores'
import {
  MODEL_RAKUEN_TYPE,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO,
  URL_DEFAULT_AVATAR
} from '@constants'
import {
  RakuenType,
  RakuenTypeGroup,
  RakuenTypeGroupCn,
  RakuenTypeMono,
  RakuenTypeMonoCn,
  TopicId
} from '@types'
import { TABS } from '../ds'
import State from './state'

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

  /**
   * 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 主动设置屏蔽 18x 关键字
   *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽默认头像用户和 18x
   */
  rakuen(type: RakuenType | RakuenTypeMono | RakuenTypeGroup) {
    return computed(() => {
      const rakuen = type === 'hot' ? rakuenStore.hot : rakuenStore.rakuen(this.state.scope, type)
      const { filterDefault, filter18x } = systemStore.setting
      if (filterDefault || filter18x || userStore.isLimit) {
        return {
          ...rakuen,
          list: rakuen.list.filter(item => {
            if (
              (filterDefault || userStore.isLimit) &&
              item?.avatar?.includes(URL_DEFAULT_AVATAR)
            ) {
              return false
            }

            if (filter18x || userStore.isLimit) {
              const group = String(item.group).toLocaleLowerCase()
              return !['gal', '性', '癖', '里番'].some(i => group.includes(i))
            }

            return true
          })
        }
      }
      return rakuen
    }).get()
  }

  /** 帖子历史查看记录 */
  readed(topicId: TopicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  /** 计算实际 type */
  type(page: number) {
    return computed(() => {
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
    }).get()
  }

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
  isFavor(topicId: TopicId) {
    return computed(() => rakuenStore.favorV2(topicId)).get()
  }
}
