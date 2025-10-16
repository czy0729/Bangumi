/*
 * @Author: czy0729
 * @Date: 2022-07-18 17:25:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-16 20:20:54
 */
import { FixedTextareaInstance, ListViewInstance, ListViewProps } from '@components'
import { GetRouteParams, Id, Ref, RouteTopic, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTopic>

export type FilterType = '' | 'follow' | 'likes' | 'me' | 'friends'

/** 长列表引用 */
export type HandleScrollViewRef = Ref<ListViewInstance>

/** 底部回复框引用 */
export type HandleFixedTextareaRef = Ref<FixedTextareaInstance>

/** 楼层进度条点击 */
export type HandleFloorPress = (number?: number) => void

/** 导演模式, 按楼层回复顺序前进或者退后 */
export type HandleDirect = (isNext?: boolean, step?: number) => void

/** 滚动到顶 */
export type HandleScrollTo = (
  index?: number,
  showInfo?: boolean,
  animated?: boolean,
  viewOffset?: number
) => void

/** 滚动到顶 */
export type HandleScrollToTop = () => void

/** 滚动失败后尝试使用保守的方法再次滚动 */
export type HandleScrollToIndexFailed = ListViewProps['onScrollToIndexFailed']

/** 提醒页面进入跳转到指定提醒楼层 */
export type HandleJumpTo = (postId?: Id) => void

/** 显示底部输入框 */
export type HandleShowFixedTextarea = () => void
