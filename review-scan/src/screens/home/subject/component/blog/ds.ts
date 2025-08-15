/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:59:52
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Blog')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  showBlog: true as typeof systemStore.setting.showBlog,
  subjectId: 0 as $['subjectId'],
  blog: [] as $['subject']['blog'],
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
