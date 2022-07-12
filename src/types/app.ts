/*
 * App 项目特定数据结构
 *
 * @Author: czy0729
 * @Date: 2022-06-27 13:12:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-12 09:00:15
 */
import * as Screens from '@screens'
import AppIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/AntDesign.json'
import IoniconsIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/Ionicons.json'
import MaterialIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json'
import { EventKeys } from '@constants/events'
import { DeepPartial, Override } from './utils'
import { SITES } from '@constants'

/** 图标 (iOS Style) */
export type IoniconsIconsNames = keyof typeof IoniconsIcons

/** 图标 (Material Style) */
export type MaterialIconsNames = keyof typeof MaterialIcons

/** 图标 (Iconfont Style) */
export type AppIconsNames = keyof typeof AppIcons

/** 所有图标 */
export type IconfontNames =
  | AppIconsNames
  | IoniconsIconsNames
  | `md-${MaterialIconsNames}`
  | 'home'
  | 'trophy'

/** 所有页面路径名 */
export type Paths = keyof typeof Screens

/** react-navigation 路由对象 */
export type Navigation = {
  push?: (path: Paths, params?: object) => any
  navigate?: (path: Paths) => any
  goBack?: (arg0?: any) => any
  popToTop?: (arg0?: any) => any
  getRootState?: (arg0?: any) => any
  setOptions?: (params?: object) => any
}

/**  带 navigation 定义的 props */
export type NavigationProps<T = {}> = Override<
  {
    navigation: Navigation
  },
  T
>

/** 埋点名称 */
export { EventKeys }

/** 埋点对象 */
export type EventType = {
  id?: EventKeys
  data?: {
    [key: string]: string | number | boolean
  }
}

/** 列表对象 */
export type ListEmpty<T = any> = {
  list: T[]
  pagination: {
    page: number
    pageTotal: number
  }
  _list?: T[]
  _loaded: Loaded
}

/** T: 传入 state 的所有 keys, 约束把所有 key 都可以通过 this[key] 访问 */
export type StoreConstructor<T extends Record<string, unknown>> = {
  [K in keyof T]: any
} & {
  state: T
}

/** @todo */
export type StoreType = any

/** @todo */
export type StoreInstance = any

/** 允许显示的源头 */
export type Sites = typeof SITES[number]

/** data._loaded */
export type Loaded = boolean | number

/** 自定义源头数据 */
export type Origin = DeepPartial<{
  base: Record<
    string,
    {
      active: boolean
      sort: any
    }
  >
  custom: Record<
    'anime' | 'hanime' | 'manga' | 'wenku' | 'music' | 'game' | 'real',
    {
      id: string
      uuid: string
      name: string
      url: string
      sort: any
      active: number
    }[]
  >
}>
