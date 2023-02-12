/*
 * App 项目特定数据结构
 *
 * @Author: czy0729
 * @Date: 2022-06-27 13:12:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 05:19:09
 */
import AppIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/AntDesign.json'
import IoniconsIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/Ionicons.json'
import MaterialIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json'
import { SITES } from '@constants'
import { EventKeys } from '@constants/events'
import { Id, SubjectId } from './bangumi'
import { AnyObject, DeepPartial, Override } from './utils'
import { NavigationPushType, Paths } from './route'

export { Paths }

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
  | 'setting'
  | 'trophy'

/** react-navigation 路由对象 */
export type Navigation = {
  /** 前进 */
  push?: NavigationPushType

  /** 替换 */
  replace?: (path: Paths, params?: object) => any

  /** 跳转到 */
  navigate?: (path: Paths) => any

  /** 后退 */
  goBack?: (arg0?: any) => any

  /** 出栈到顶 */
  popToTop?: (arg0?: any) => any

  /** 获取根部路由状态 */
  getRootState?: (arg0?: any) => any

  /** 动态设置路由参数 */
  setOptions?: (params?: object) => any

  /** 订阅 */
  addListener?: (eventType: string, callback: () => any) => any

  /** 触发订阅事件 */
  emit?: (params?: object) => any

  /** @deprecated 获取参数 */
  getParam?: (arg0?: any) => any

  /** @deprecated 设置参数 */
  setParams?: (arg0?: any) => any
}

/**  带 navigation 定义的 props */
export type NavigationProps<T = {}> = Override<
  {
    navigation: Navigation
    route?: {
      key: string
      name: string
      params: AnyObject
    }
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

/** 自定义跳转数据 */
export type Actions = Record<
  SubjectId,
  {
    uuid: Id
    name: string
    url: string
    sort: Id
    active: number
  }[]
>
