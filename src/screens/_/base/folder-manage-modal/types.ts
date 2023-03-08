/*
 * @Author: czy0729
 * @Date: 2022-06-14 13:46:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-07 18:23:22
 */
import { Id, SubjectId } from '@types'

export type Props = {
  id?: SubjectId
  defaultExpand?: Id
  defaultEditItem?: null | object
  visible?: boolean
  title?: string
  onClose?: () => any
}

export type State = {
  visible: boolean
  expand: Id[]
  list: any[]

  /** 是否正在新建目录, 目录编辑 */
  create: boolean | string
  title: string
  desc: string

  /** 条目编辑 */
  edit: number
  content: string
  order: string | number
}
