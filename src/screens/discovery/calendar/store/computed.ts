/*
 * @Author: czy0729
 * @Date: 2024-06-20 17:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 07:18:21
 *
 * 每日放送派生: 分区列表 / 放送数据缺失判定 / 工具栏菜单
 */
import { computed } from 'mobx'
import { MENU_TITLE_COLOR } from '@components/hold-menu/ds'
import { calendarStore, collectionStore, subjectStore } from '@stores'
import { desc, getOnAirItem } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { get } from '@utils/thirdParty/protobuf'
import {
  TEXT_MENU_FAVOR,
  TEXT_MENU_GRID,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_LIST,
  TEXT_MENU_NOT_SHOW,
  TEXT_MENU_ONLY_SHOW,
  TEXT_MENU_SHOW,
  withSplit
} from '@constants'
import { TEXT_UNKNOWN_ONAIR } from '../ds'
import { getShowPrevDay, getTime } from '../utils'
import State from './state'
import {
  AIR_TIME_MISSING_MIN_COUNT,
  AIR_TIME_MISSING_MIN_UNKNOWN,
  AIR_TIME_MISSING_RATIO
} from './ds'

import type { Calendar } from '@stores/calendar/types'
import type { SubjectId } from '@types'
import type { SectionListCalendarItem } from '../types'

export default class Computed extends State {
  /** 每日放送 */
  @computed get calendar() {
    return calendarStore.calendar
  }

  /**
   * 条目过滤管线 (sections 与筛选菜单数字共用, 保证菜单数字 = 切换后的结果数)
   *  - skip: 计算某维菜单数字时跳过自身维的条件 (预演「切换到该选项」)
   */
  filterItem = (
    item: Calendar['list'][number]['items'][number],
    skip?: 'adapt' | 'tag' | 'origin'
  ) => {
    // 未知时间番剧
    if (!this.state.expand) {
      const time = getTime(item, item.id)
      if (!time || time === '2359') return false
    }

    // 收藏
    if (this.state.type === 'collect') {
      if (!collectionStore.collect(item.id)) return false
    }

    // 筛选
    const {
      type: onAirAdapt = '',
      origin: onAirOrigin = '',
      tag: onAirTag = ''
    } = getOnAirItem(item.id)
    if (skip !== 'adapt' && this.state.adapt && onAirAdapt !== this.state.adapt) return false
    if (skip !== 'origin' && this.state.origin && !onAirOrigin?.includes(this.state.origin)) {
      return false
    }
    if (skip !== 'tag' && this.state.tag && !onAirTag?.includes(this.state.tag)) return false

    return true
  }

  /** 筛选菜单数字: 候选与排序沿用全量分布, 数字为「完整条件下去掉自身维, 切换到该选项」的结果数 */
  @computed get onAirMenus() {
    const data = this.calendar.list
    const all = { adapts: {}, origins: {}, tags: {} } as Record<string, Record<string, number>>
    const counts = { adapts: {}, origins: {}, tags: {} } as Record<string, Record<string, number>>

    const bucket = (map: Record<string, number>, values: string | undefined) => {
      if (!values) return
      values.split('/').forEach(item => {
        const value = item.trim()
        map[value] = (map[value] || 0) + 1
      })
    }

    data.forEach(({ items }) => {
      items.forEach(({ id }) => {
        const { type: adapt, origin, tag } = getOnAirItem(id)

        if (adapt) all.adapts[adapt] = (all.adapts[adapt] || 0) + 1
        bucket(all.origins, origin)
        bucket(all.tags, tag)
      })
    })
    ;(['adapt', 'origin', 'tag'] as const).forEach(dim => {
      data.forEach(({ items }) => {
        items.forEach(item => {
          if (!this.filterItem(item, dim)) return
          const { type: adapt, origin, tag } = getOnAirItem(item.id)
          if (dim === 'adapt') {
            if (adapt) counts.adapts[adapt] = (counts.adapts[adapt] || 0) + 1
          } else if (dim === 'origin') {
            bucket(counts.origins, origin)
          } else {
            bucket(counts.tags, tag)
          }
        })
      })
    })

    const toMenuData = (allRecord: Record<string, number>, countRecord: Record<string, number>) => [
      '全部',
      // 排序沿用全量分布 (原版菜单顺序), 零值选项位置不变; 零结果置灰 (菜单标题同款灰色), 仍可点选
      ...Object.entries(allRecord)
        .sort((a, b) => desc(a[1], b[1]))
        .map(([key]) => {
          const value = countRecord[key] ?? 0
          return value === 0 ? { text: `${key} (0)`, color: MENU_TITLE_COLOR } : `${key} (${value})`
        })
    ]

    return {
      adapts: toMenuData(all.adapts, counts.adapts),
      origins: toMenuData(all.origins, counts.origins),
      tags: toMenuData(all.tags, counts.tags)
    }
  }

  /**
   * 换季后线上与内置放送数据均未包含新番时, 大部分条目会落入「未知时间」
   * 正常季节数据源覆盖率很高, 未知占比远达不到该比例, 可据此判断数据缺失
   */
  @computed get isAirTimeMissing() {
    const items = this.calendar.list.flatMap(({ items }) => items)
    if (items.length < AIR_TIME_MISSING_MIN_COUNT) return false

    let unknown = 0
    items.forEach(item => {
      if (getTime(item, item.id) === '2359') unknown += 1
    })

    return (
      unknown >= AIR_TIME_MISSING_MIN_UNKNOWN && unknown / items.length >= AIR_TIME_MISSING_RATIO
    )
  }

  /** 每日放送分区列表 */
  @computed get sections() {
    let day = new Date().getDay()
    if (day === 0) day = 7

    const showPrevDay = getShowPrevDay()
    const shift = day - (showPrevDay ? 2 : 1)

    const list = this.calendar.list.map(item => ({
      ...item,
      items: item.items
        .filter(item => this.filterItem(item))
        .sort((a, b) => desc(getTime(a), getTime(b)))
    }))

    let listIndex = -1
    return list
      .slice(shift)
      .concat(list.slice(0, shift))
      .map((item, index) => ({
        title: item.weekday.cn,
        index,
        data: [
          {
            ...item,
            items: item.items.map(item => {
              listIndex += 1
              return {
                ...item,
                index: listIndex
              }
            }) as SectionListCalendarItem[]
          }
        ]
      }))
  }

  /** 是否列表 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 条目信息 */
  subject = computedFn((subjectId: SubjectId) => {
    return subjectStore.subject(subjectId)
  })

  /** 放送站点 */
  sites = computedFn((subjectId: SubjectId) => {
    if (!this.state.loadedBangumiData) return {}

    return get('bangumi-data')?.find(item => item.id == subjectId)?.s || {}
  })

  /** 工具栏菜单 */
  @computed get toolBar() {
    return [
      `${TEXT_MENU_LAYOUT}${withSplit(
        this.state.layout === 'list' ? TEXT_MENU_LIST : TEXT_MENU_GRID
      )}`,
      `${TEXT_MENU_FAVOR}${withSplit(
        this.state.type === 'all' ? TEXT_MENU_SHOW : TEXT_MENU_ONLY_SHOW
      )}`,
      `${TEXT_UNKNOWN_ONAIR}${withSplit(this.state.expand ? TEXT_MENU_SHOW : TEXT_MENU_NOT_SHOW)}`
    ]
  }
}
