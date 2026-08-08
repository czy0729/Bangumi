/*
 * @Author: czy0729
 * @Date: 2024-08-01 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 00:00:00
 */
import type { ViewProps } from 'react-native'
import type { DeepPartial, Override } from '@types'
import type { computeInViewY } from './utils'

/** InView 对外 Props, 由 ViewProps 派生 */
export type Props = Override<
  ViewProps,
  {
    /** 列表项索引, 小于 8 的项直接渲染不做懒加载 */
    index?: number

    /** 预测的 y 轴坐标, 不传则等待 onLayout 测量自身位置 */
    y?: number

    /** 是否显示开发调试信息 */
    log?: boolean

    /** 用 Flex 代替 View 渲染 */
    flex?: boolean
  }
>

/** useInView 参数, y 与 onLayout 直接复用 Props 的声明 */
export type UseInViewParams = Pick<Props, 'y' | 'onLayout'> & {
  /** 页面可视底部 y 轴（由 store 注入）, 已展示后为 undefined 不再判定 */
  visibleBottom?: number

  /** 进入提前渲染区域时回调, 由父组件将其置为已展示 */
  onShow: () => void
}

/** InView 组件类型, 附带静态方法 y 用于计算懒渲染触发坐标 */
export type InViewComponentType = {
  (props: Props): JSX.Element

  /** 根据索引与高度计算懒渲染触发 y 坐标 */
  y: typeof computeInViewY
}

/** 页面 store 上下文, 用于读取 visibleBottom 控制懒渲染 */
export type Ctx = DeepPartial<{
  $: {
    state: {
      /** 页面可视底部 y 轴, 控制 InView 懒渲染 */
      visibleBottom: number
    }
  }
}>
