/*
 * @Author: czy0729
 * @Date: 2022-06-14 13:46:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:06:48
 */
import { SubjectId } from '@types'

export type Props = {
  id?: SubjectId
  defaultExpand?: number
  defaultEditItem?: null | object
  visible?: boolean
  title?: string
  onClose?: () => any
}

export type State = {
  visible: boolean
  expand: any[]

  /** 是否正在新建目录, 目录编辑 */
  create: boolean | string
  title: string
  desc: string

  /** 条目编辑 */
  edit: number
  content: string
  order: string | number
}
