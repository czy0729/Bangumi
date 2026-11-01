/*
 * @Author: czy0729
 * @Date: 2025-03-20 14:36:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:48:51
 */
import type {
  CatalogDetail,
  CatalogsItem,
  HandleChange,
  HandleControl,
  HandleCreate,
  HandleExpand,
  HandleSubmitCatalog,
  HandleToggle,
  Props as ComponentProps,
  State as ComponentState
} from '../types'

export type Props = {
  id: ComponentProps['id']
  expand: ComponentState['expand']
  create: ComponentState['create']
  edit: ComponentState['edit']
  desc: ComponentState['desc']
  privacy: ComponentState['privacy']
  item: CatalogsItem
  detail: CatalogDetail
  onChange: HandleChange
  onExpand: HandleExpand
  onToggle: HandleToggle
  onControl: HandleControl
  onCreate: HandleCreate
  onSubmitCatalog: HandleSubmitCatalog
}

/** 目录编辑表单参数 */
export type EditFormProps = {
  /** 目录标题 */
  title: string

  /** 目录介绍 */
  desc: string

  /** 隐私设置 */
  privacy: ComponentState['privacy']

  onChange: HandleChange
}
