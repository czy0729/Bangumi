/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:35:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:30
 */
import { calendarStore, systemStore } from '@stores'
import CacheManager from '@utils/cache-manager'
import { computedFn } from '@utils/computed-fn'
import { MODEL_SETTING_HOME_SORTING, MODEL_SUBJECT_TYPE, WEB } from '@constants'
import { NAMESPACE } from '../ds'
import { getSubjectFilterName, matchFilter, sortByIds } from '../utils'
import Air from './air'

import type { UserCollection } from '@stores/user/types'
import type { UserCollectionItem } from '@utils/fetch.v0/types'
import type { SettingHomeSorting, SubjectId, SubjectTypeValue } from '@types'
import type { TabsLabel } from '../../types'

export default class List extends Air {
  /** 列表当前数据 */
  currentCollection = computedFn((title: TabsLabel) => {
    const key = `${NAMESPACE}|${title}`
    const isFetching = this.state.progress.fetching

    // 列队刷新收藏状态期间优先返回快照, 避免队列中数据逐步变化导致列表闪烁
    if (isFetching) {
      const cachedData = CacheManager.get<UserCollection>(key)
      if (cachedData) return cachedData
    }

    // 游戏的数据源和结构都不一样, 需要单独处理
    const data =
      title === '游戏' ? (this.games as unknown as UserCollection) : this.computeCollection(title)

    // 快照仅在刷新期间写入, 内部是 toJS 深拷贝, 常规路径跳过以省掉整表克隆开销
    if (isFetching) CacheManager.set(key, data)

    return data
  })

  /** 计算 Tab 收藏数据 (类型过滤 + 文字过滤 + 排序) */
  computeCollection(title: TabsLabel) {
    // 基础数据
    const data = {
      ...this.collection
    }

    // 过滤条目类型
    const type = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(title)
    if (type) {
      data.list = data.list.filter(item => item?.subject?.type == type)
    }

    // 文字过滤处理
    if (this.isFilter(title) && this.filter.length) {
      data.list = data.list.filter(item => {
        const cnName = getSubjectFilterName(undefined, item)
        return matchFilter(cnName, this.filter)
      })
    }

    if (title === '全部' && systemStore.setting.showGame) {
      data.list = [...this.sortList(data.list), ...this.games.list] as UserCollectionItem[]
    } else {
      data.list = [...this.sortList(data.list)]
    }

    if (WEB) data.list = data.list.slice(0, 50)

    return data
  }

  /**
   * 列表排序（优先度从上到下）
   *  - 放送中还有未看
   *  - 放送中没未看
   *  - 明天放送还有未看
   *  - 明天放送中没未看
   *  - 未完结新番还有未看
   *  - 默认排序
   */
  sortList = (list: UserCollectionItem[]) => {
    return this.sortListByIds(list.map(item => item.subject_id))
  }

  /**
   * 按 subjectId 集合排序并缓存
   * 缓存 key 为原始类型数组(String 后单射), 内部读取均走 observable, 依赖变化自动重算
   */
  sortListByIds = computedFn((ids: SubjectId[]) => {
    const list = ids.map(id => this.collectionMap[id]).filter(Boolean) as UserCollectionItem[]

    return sortByIds(list, {
      topMap: this.topMap,
      isWeb:
        systemStore.setting.homeSorting ===
        MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('网页'),
      sortOnAir: this.sortOnAir,
      getAir: subjectId => calendarStore.onAir[subjectId]?.air || 0,
      onAirCustom: subjectId => this.onAirCustom(subjectId),
      hasNewEp: subjectId => this.hasNewEp(subjectId),
      isToday: subjectId => this.isToday(subjectId),
      isNextDay: subjectId => this.isNextDay(subjectId),
      watchedCount: subjectId => this.watchedCount(subjectId)
    })
  })
}
