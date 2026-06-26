/*
 * @Author: czy0729
 * @Date: 2021-11-30 03:41:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-26 18:00:00
 */
import { logger, rc } from '@utils/dev'
import { DEV, TEXT_EMPTY, TEXT_FAIL, TEXT_NO_MORE, TEXT_REFRESHING } from '@constants'
import { COMPONENT as PARENT } from '../ds'

/** 组件调试标识 */
export const COMPONENT = rc(PARENT, 'ListView')

/** 默认属性，避免每次渲染创建新对象 */
export const DEFAULT_PROPS = {
  sectionKey: '',
  refreshControlProps: {},
  footerRefreshingText: TEXT_REFRESHING,
  footerFailureText: TEXT_FAIL,
  footerNoMoreDataText: TEXT_NO_MORE,
  footerEmptyDataText: TEXT_EMPTY,
  footerTextType: 'sub' as const,
  showFooter: true,
  showMesume: true,
  optimize: true,
  scrollToTop: false,
  scrollIndicatorInsets: { right: 1 }
} as const

/** 列表刷新状态枚举 */
export const REFRESH_STATE = {
  /** 空闲，无加载操作 */
  Idle: 0,

  /** 头部下拉刷新中 */
  HeaderRefreshing: 1,

  /** 底部上拉加载更多中 */
  FooterRefreshing: 2,

  /** 没有更多数据 */
  NoMoreData: 3,

  /** 加载失败 */
  Failure: 4,

  /** 空数据 */
  EmptyData: 5
} as const

/** 默认滚动回调，未绑定事件时的占位函数，开发环境下输出日志 */
export const SCROLL_CALLBACK = () => {
  if (DEV) logger.info('LIST_VIEW: no scroll event bind')
}

/** FlatList 每批渲染的最大条目数 */
export const DEFAULT_MAX_TO_RENDER_PER_BATCH = 40

/** FlatList 更新批次的时间间隔（毫秒） */
export const DEFAULT_UPDATE_CELLS_BATCHING_PERIOD = 40

/** FlatList 虚拟化窗口大小，决定屏幕外保留多少屏的渲染内容 */
export const DEFAULT_WINDOW_SIZE = 16

/** 滑动距离超过此阈值（像素）才锁定滚动状态，防止轻微触碰误触发 */
export const SCROLL_THRESHOLD = 16
