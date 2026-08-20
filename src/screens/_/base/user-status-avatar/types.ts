/*
 * @Author: czy0729
 * @Date: 2022-06-14 11:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 20:32:38
 */
import type { ImageProps } from '@components'
import type { EventType, UserId, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<
    {
      /** 是否显示追踪爱心图标 */
      like?: boolean

      /** 用户 ID */
      userId: UserId

      /** 用户名 */
      userName: string

      /** 头像地址 */
      avatar: ImageProps['src']

      /** 是否使用迷你尺寸的用户状态 */
      mini?: boolean

      /** 埋点事件 */
      event?: EventType
    } & Pick<ImageProps, 'size' | 'radius' | 'onPress'>
  >
>
