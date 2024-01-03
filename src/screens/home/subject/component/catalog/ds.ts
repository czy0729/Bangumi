/*
 * @Author: czy0729
 * @Date: 2022-08-25 22:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 22:09:48
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Catalog')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showCatalog: true as typeof systemStore.setting.showCatalog,
  catalog: [] as $['catalog'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
