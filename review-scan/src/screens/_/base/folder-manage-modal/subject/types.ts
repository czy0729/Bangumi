/*
 * @Author: czy0729
 * @Date: 2025-03-20 15:03:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 15:19:56
 */
import {
  CatalogDetailItem,
  CatalogsItem,
  HandleChange,
  HandleForwardRef,
  HandleOrder,
  HandleSubjectControl,
  HandleSubjectEdit,
  HandleSubmit,
  Props as ComponentProps,
  State as ComponentState
} from '../types'

export type Props = {
  forwardRef: HandleForwardRef
  id: ComponentProps['id']
  create: ComponentState['create']
  edit: ComponentState['edit']
  content: ComponentState['content']
  order: ComponentState['order']
  pItem: CatalogsItem
  item: CatalogDetailItem
  index: number
  length: number
  onSubjectEdit: HandleSubjectEdit
  onSubjectControl: HandleSubjectControl
  onChange: HandleChange
  onOrder: HandleOrder
  onSubmit: HandleSubmit
}
