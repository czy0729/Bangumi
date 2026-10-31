/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:00:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * 时间胶囊页路由上下文类型
 */
import type { ScrollToIndex } from '@components'
import type { WithNavigation } from '@types'
import type Store from './store'
import type { TABS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type TabLabel = (typeof TABS)[number]['title']

/** 列表暴露的滚动方法 */
export type ScrollHandle = {
  /** 滚动到指定项 */
  scrollToIndex: ScrollToIndex
}
