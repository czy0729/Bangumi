/*
 * @Author: czy0729
 * @Date: 2022-06-14 13:46:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 15:12:23
 */
import { CatalogDetail, CatalogDetailItem } from '@stores/discovery/types'
import { CatalogsItem } from '@stores/users/types'
import { Id, SubjectId } from '@types'
import { ORDER_DS, SORT_DS } from './ds'

export { CatalogDetail, CatalogDetailItem, CatalogsItem }

export type SortType = (typeof SORT_DS)[number]['value']

export type SortOrder = (typeof ORDER_DS)[number]['value']

export type Props = {
  id?: SubjectId
  defaultExpand?: Id
  defaultEditItem?: CatalogDetailItem
  visible?: boolean
  title?: string
  onClose?: () => any
}

export type State = {
  visible: boolean
  expand: Id[]
  list: CatalogsItem[]

  /** 是否正在新建目录, 目录编辑 */
  create: boolean | string
  title: string
  desc: string

  /** 条目编辑 */
  edit: Id
  content: string
  order: string | number

  /** 排序 */
  sortType: SortType
  sortOrder: SortOrder
}

export type HandleForwardRef = (ref: any) => void

export type HandleChange = (value: string, key?: 'title' | 'desc' | 'content') => void

export type HandleExpand = (item: { id: Id }) => void

export type HandleToggle = (item: { id: any }, detail: { list: any[] }, isIn: boolean) => void

export type HandleControl = (title: string, item: { id: any; title: any }) => void

export type HandleCreate = (isNew: boolean) => void

export type HandleSubmitCatalog = () => void

export type HandleSubjectEdit = (item?: CatalogDetailItem) => void

export type HandleSubjectControl = (
  title: string,
  item: CatalogDetailItem,
  pItem: CatalogsItem
) => void

export type HandleOrder = (order: State['order']) => void

export type HandleSort = (
  item: CatalogDetailItem,
  order: State['order'],
  pItem: CatalogsItem
) => void

export type HandleSortType = (sortType: SortType) => void

export type HandleSubmit = (item: CatalogDetailItem, pItem: CatalogsItem) => void
