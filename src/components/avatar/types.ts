/*
 * @Author: czy0729
 * @Date: 2022-06-12 16:04:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 06:01:21
 */
import type { NavigationPushType, UserId, WithNavigation, WithViewStyles } from '@types'
import type { ImageProps } from '../image'
import type { TouchableProps } from '../touchable'

/** 用户空间路由参数 */
type ZoneParams = NavigationPushType extends (path: 'Zone', params?: infer Params) => void
  ? Params
  : never

/**
 * 头像组件属性
 *
 * 复用 ImageProps 的字段:
 *  - src: 头像地址
 *  - size: 大小
 *  - borderWidth: 边框大小
 *  - event: 埋点事件
 *  - radius: 圆角大小
 *  - placeholder: 是否显示底色
 *  - fallbackSrc: 错误回滚地址
 *  - priority: 图片同一时间有复数加载时的优先级
 *  - skeleton: 是否显示骨架屏动画
 *  - skeletonType: 骨架屏渐变颜色风格
 */
export type Props = WithViewStyles<
  WithNavigation<
    Pick<
      ImageProps,
      | 'src'
      | 'size'
      | 'borderWidth'
      | 'event'
      | 'radius'
      | 'placeholder'
      | 'fallbackSrc'
      | 'priority'
      | 'skeleton'
      | 'skeletonType'
    > & {
      /** 用户 ID, 存在则允许点击进入用户空间 */
      userId?: UserId

      /** 用户昵称 */
      name?: string

      /** 边框颜色, 有值时覆盖 ImageProps.border */
      borderColor?: ImageProps['border']

      /** 跳转用户空间时额外传递的路由参数 */
      params?: ZoneParams

      /** 是否强制圆形 */
      round?: boolean

      /** 点击回调, 存在时覆盖跳转用户空间 */
      onPress?: TouchableProps['onPress']

      /** 长按回调 */
      onLongPress?: TouchableProps['onLongPress']
    }
  >
>
