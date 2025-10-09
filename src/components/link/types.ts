/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-19 21:43:30
 */
import { EventType, NavigationPushType, Override, Paths } from '@types'
import { TouchableProps } from '../touchable'

type ExtractParams<P extends Paths> = NavigationPushType extends (
  path: P,
  params?: infer Params
) => any
  ? Params
  : never

export type Props<T extends Paths> = Override<
  Omit<TouchableProps, 'onPress'>,
  {
    /** 路由地址, 支持 https 链接 */
    path: T | `https://${string}`

    /** 路由参数 */
    params?: ExtractParams<T>

    /** 延迟获取路由参数, 有利于减少重渲染 (优先于 params) */
    getParams?: () => ExtractParams<T>

    /** 事件 ID */
    eventId?: EventType['id']

    /** 事件参数 */
    eventData?: EventType['data']
  }
>
