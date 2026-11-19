/*
 * @Author: czy0729
 * @Date: 2025-03-20 14:36:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 20:25:48
 */
import type {
  CatalogDetail,
  CatalogsItem,
  HandleControl,
  HandleExpand,
  HandleToggle,
  Props as ComponentProps,
  State as ComponentState
} from '../types'

export type Props = {
  id: ComponentProps['id']
  expand: ComponentState['expand']
  edit: ComponentState['edit']
  item: CatalogsItem
  detail: CatalogDetail
  onExpand: HandleExpand
  onToggle: HandleToggle
  onControl: HandleControl
}
