/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:40:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 12:05:39
 */
import type { PropsWithChildren } from 'react'
import type { MonoVoicesItem } from '@stores/subject/types'
import type { EventType, Navigation, Override, ViewStyle } from '@types'

export type Props = PropsWithChildren<
  Override<
    MonoVoicesItem,
    {
      navigation?: Navigation
      style?: ViewStyle
      event?: EventType
      index?: number

      /** 角色的相关参与条目是否根据用户收藏状态过滤 */
      collected?: '全部' | '已收藏' | '系列有收藏' | '未收藏'
    }
  >
>
