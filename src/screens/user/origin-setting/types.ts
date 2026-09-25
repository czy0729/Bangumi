/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 21:47:54
 *
 * 页面类型: Store 上下文、源头分类、源头条目与编辑表单
 */
import type { ImageSource, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 源头分类 */
export type Keys = 'anime' | 'hanime' | 'manga' | 'wenku' | 'music' | 'game' | 'real'

/** 源头条目 */
export type OriginItem = {
  /** 自定义项 uuid, 预设项没有 */
  uuid?: string

  /** 预设项 id (type|name), 自定义项没有 */
  id?: string

  /** 名称 */
  name: string

  /** 网址 */
  url: string

  /** 排序值, 越大越前 */
  sort: number

  /** 图标 */
  icon?: string | ImageSource

  /** 图标是否方形 */
  iconSquare?: boolean

  /** 是否启用 */
  active: 0 | 1

  /** 说明 */
  desc?: string
}

/** 编辑表单项 */
export type EditItem = Pick<OriginItem, 'id' | 'name' | 'url' | 'sort' | 'active'> & {
  /** 自定义项 uuid, 预设项为空字符串 */
  uuid: string
}

/** 源头条目定位参数: 预设项用 id, 自定义项用 uuid */
export type ItemParams = {
  /** 预设项 id */
  id?: string

  /** 自定义项 uuid */
  uuid?: string

  /** 源头类型 */
  type: Keys
}
