/*
 * @Author: czy0729
 * @Date: 2022-08-25 22:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 17:00:06
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { systemStore } from '@stores'
import type { Ctx } from '../../types'
import type { memoStyles } from './styles'

type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Catalog')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showCatalog: true as typeof systemStore.setting.showCatalog,
  catalog: [] as $['catalog'],
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
