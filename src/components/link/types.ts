/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 12:26:26
 */
import type { EventType, NavigationPushType, Override, Paths } from '@types'
import type { TouchableProps } from '../touchable'

type ExtractParams<P extends Paths> = NavigationPushType extends (
  path: P,
  params?: infer Params
) => any
  ? Params
  : never

/** 公共字段 */
type BaseProps<T extends Paths> = Override<
  TouchableProps,
  {
    /** 路由参数 */
    params?: ExtractParams<T>

    /** 延迟获取路由参数, 有利于减少重渲染 (优先于 params) */
    getParams?: () => ExtractParams<T>

    /** 事件 ID */
    eventId?: EventType['id']

    /** 事件参数 */
    eventData?: EventType['data']

    /** 延迟获取事件参数, 有利于减少重渲染 (优先于 eventData) */
    getEventData?: () => EventType['data']

    /** 是否禁止点击 */
    disabled?: boolean
  }
>

/** Props：严格区分 appNavigate 是否为 true */
export type Props<T extends Paths> =
  | (BaseProps<T> & {
      /** 路由地址, 支持 https 链接 */
      path: T | `https://${string}`

      /** 是否自动判断 url 以跳转到对应客户端页面 */
      appNavigate?: false | undefined
    })
  | (BaseProps<T> & {
      /** 路由地址, 支持 https 链接，也可为任意 string */
      path: T | `https://${string}` | string

      /** 是否自动判断 url 以跳转到对应客户端页面 */
      appNavigate: true
    })
