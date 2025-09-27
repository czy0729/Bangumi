/*
 * @Author: czy0729
 * @Date: 2025-03-20 11:34:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 14:37:08
 */
import { HandleChange, HandleCreate, HandleSubmitCatalog, State as ComponentState } from '../types'

export type Props = {
  title: ComponentState['title']
  desc: ComponentState['desc']
  onChange: HandleChange
  onCreate: HandleCreate
  onSubmitCatalog: HandleSubmitCatalog
}
