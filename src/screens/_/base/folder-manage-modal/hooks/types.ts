/*
 * @Author: czy0729
 * @Date: 2026-11-01 23:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 23:00:00
 *
 * 目录管理弹窗 hooks 的参数类型
 */
import type { EventData } from '@utils/track/type'
import type { CatalogDetail, CatalogDetailItem } from '@stores/discovery/types'
import type { Id } from '@types'
import type { HandleSubjectEdit, Props } from '../types'

/** useFolderManageModal 参数 */
export type UseFolderManageModalOptions = Pick<
  Props,
  'defaultEditItem' | 'defaultExpand' | 'id' | 'onClose' | 'visible'
>

/** 目录创建 / 编辑表单状态机参数 */
export type UseCatalogFormOptions = {
  /** 可用的授权码 (调用方缓存优先, 其次全局登录态) */
  getUsableFormhash: () => string

  /** 请求目录列表 */
  fetchCatalogs: () => Promise<boolean>

  /** 强制刷新指定目录详情并缓存授权码 */
  syncFormhash: (catalogId: Id, refresh: boolean) => Promise<boolean>

  /** 埋点 */
  track: (value: string, other?: EventData) => void
}

/** 条目编辑 / 排序状态机参数 */
export type UseSubjectEditorOptions = {
  /** 条目 Id, 添加 / 移出条目的目标 */
  id: Id

  /** 可用的授权码 (调用方缓存优先, 其次全局登录态) */
  getUsableFormhash: () => string

  /** 读取目录详情 (带上目录 id, 供条目排序计算) */
  catalogDetail: (catalogId: Id) => CatalogDetail & { id: Id }

  /** 强制刷新指定目录详情并缓存授权码 */
  syncFormhash: (catalogId: Id, refresh: boolean) => Promise<boolean>

  /** 埋点 */
  track: (value: string, other?: EventData) => void
}

/** 目录列表与排序状态机参数 */
export type UseExpandOptions = {
  /** 写操作过的目录 Id, 重新展开时对它们强制刷新一次详情 */
  dirtyRef: { current: Set<Id> }

  /** 退出条目编辑态 */
  onSubjectEdit: HandleSubjectEdit

  /** 批量获取目录中已收藏条目的最新状态 */
  fetchCollectStatusQueue: (catalogId: Id) => void

  /** 强制刷新指定目录详情并缓存授权码 */
  syncFormhash: (catalogId: Id, refresh: boolean) => Promise<boolean>
}

/** 打开时初始化参数 */
export type UseOpenedModalOptions = {
  /** 是否显示 */
  visible: boolean

  /** 请求目录列表 */
  fetchCatalogs: () => Promise<boolean>

  /** 外部写入展开项 (打开时应用默认展开的目录) */
  setExpand: (expand: Id[]) => void

  /** 编辑条目 */
  onSubjectEdit: HandleSubjectEdit

  /** 打开时默认展开的目录 Id */
  defaultExpand: Id

  /** 打开时默认进入编辑的条目 */
  defaultEditItem: CatalogDetailItem | null

  /** 打开时回调 (作废遗留的脏标记等) */
  onOpened: () => void
}
