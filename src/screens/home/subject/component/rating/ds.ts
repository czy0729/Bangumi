/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:35:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:37:11
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { systemStore } from '@stores'
import type { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Rating')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  hideScore: false as typeof systemStore.setting.hideScore,
  showRating: true as typeof systemStore.setting.showRating
}
