/*
 * @Author: czy0729
 * @Date: 2024-07-29 13:51:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 21:05:42
 */
import { computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { date, getTimestamp, x18s } from '@utils'
import { get } from '@utils/protobuf'
import { APP_USERID_IOS_AUTH, APP_USERID_TOURIST, MODEL_SUBJECT_TYPE, STORYBOOK } from '@constants'
import { SubjectType, SubjectTypeCn } from '@types'
import State from './state'

export default class Computed extends State {
  /** 目录 (高级) */
  @computed get catalogAdvance() {
    if (!this.state.loadedCatalog) return []

    return get('catalog').map(item => {
      // 计算这个目录大部分是什么类型的条目
      let _type: SubjectType
      if (item.r >= Math.max(item.a || 0, item.b || 0, item.m || 0, item.g || 0)) {
        _type = 'real'
      } else if (item.g >= Math.max(item.a || 0, item.b || 0, item.m || 0)) {
        _type = 'game'
      } else if (item.m >= Math.max(item.a || 0, item.b || 0)) {
        _type = 'music'
      } else if (item.b >= (item.a || 0)) {
        _type = 'book'
      } else {
        _type = 'anime'
      }

      return {
        id: item.i,
        title: item.t,
        last: item.d,
        anime: item.a || 0,
        book: item.b || 0,
        music: item.m || 0,
        game: item.g || 0,
        real: item.r || 0,
        _type
      }
    })
  }

  /** 目录筛选后 (高级) */
  @computed get catalogAdvanceFilter() {
    const { page, filterType, filterYear, filterKey } = this.state
    let list = this.catalogAdvance
    if (filterType && filterType !== '不限') {
      list = list.filter(
        item => MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item._type) === filterType
      )
    }

    if (filterYear && filterYear !== '不限') {
      if (filterYear === '近1年') {
        const ts = getTimestamp()
        const day = Number(`${Number(date('Y', ts)) - 1}${date('md', ts)}`)
        list = list.filter(item => Number(item.last.replace(/-/g, '')) >= day)
      } else if (filterYear === '近3年') {
        const ts = getTimestamp()
        const day = Number(`${Number(date('Y', ts)) - 3}${date('md', ts)}`)
        list = list.filter(item => Number(item.last.replace(/-/g, '')) >= day)
      } else {
        list = list.filter(item => item.last.includes(String(filterYear)))
      }
    }

    if (filterKey && filterKey !== '不限') {
      list = list.filter(item => item.title.includes(filterKey))
    }

    const limit = 10
    return {
      list: list.slice(limit * (page - 1), limit * page),
      _loaded: true
    }
  }

  /** 目录 */
  @computed get catalog() {
    if (this.state.type === 'advance') return this.catalogAdvanceFilter

    const catalog = discoveryStore.catalog(this.state.type, this.state.page)
    if (userStore.isLimit) {
      return {
        ...catalog,
        list: catalog.list.filter(item => !x18s(item.title))
      }
    }

    return catalog
  }

  /** 是否限制显示 */
  @computed get isLimit() {
    if (STORYBOOK || this.state.type !== 'advance') return false

    if (!userStore.isLogin) return true

    const { id } = userStore.userInfo
    if (!id || id == APP_USERID_TOURIST || id == APP_USERID_IOS_AUTH) return true
  }
}
