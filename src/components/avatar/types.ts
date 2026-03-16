/*
 * @Author: czy0729
 * @Date: 2022-06-12 16:04:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 00:01:12
 */
import type { AnyObject, EventType, UserId, WithNavigation, WithViewStyles } from '@types'
import type { ImageProps } from '../image'
import type { TouchableProps } from '../touchable'

export type Props = WithViewStyles<
  WithNavigation<{
    /** 用户 ID, 存在则允许点击进入用户空间 */
    userId?: UserId

    /** 用户昵称 */
    name?: string

    /** 头像地址 */
    src?: ImageProps['src']

    /** 大小 */
    size?: ImageProps['size']

    /** 边框大小 */
    borderWidth?: ImageProps['borderWidth']

    /** 边框颜色 */
    borderColor?: ImageProps['border']

    /** 埋点事件 */
    event?: EventType

    /** 路由跳转额外传递参数 */
    params?: AnyObject

    /** 是否强制圆形 */
    round?: boolean

    /** 圆角大小 */
    radius?: ImageProps['radius']

    /** 是否显示底色 */
    placeholder?: ImageProps['placeholder']

    /** 错误回滚地址 */
    fallbackSrc?: ImageProps['fallbackSrc']

    /** 图片同一时间有复数加载时的优先级 */
    priority?: ImageProps['priority']

    /** 是否显示骨架屏动画 */
    skeleton?: ImageProps['skeleton']

    /** 骨架屏渐变颜色风格 */
    skeletonType?: ImageProps['skeletonType']

    /** 点击回调, 会覆盖跳转到用户空间的事件 */
    onPress?: TouchableProps['onPress']

    /** 长按回调 */
    onLongPress?: TouchableProps['onLongPress']
  }>
>
