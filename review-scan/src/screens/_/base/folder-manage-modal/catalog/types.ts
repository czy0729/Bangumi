/*
 * @Author: czy0729
 * @Date: 2025-03-20 14:36:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-03-20 14:36:47
 */
import {
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
  item: CatalogsItem
  detail: CatalogDetail
  onChange: HandleChange
  onExpand: HandleExpand
  onToggle: HandleToggle
  onControl: HandleControl
  onCreate: HandleCreate
  onSubmitCatalog: HandleSubmitCatalog
}
