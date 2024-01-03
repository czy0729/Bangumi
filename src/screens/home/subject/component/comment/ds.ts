/*
 * @Author: czy0729
 * @Date: 2022-08-03 10:31:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:39:34
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Comment')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showComment: true as typeof systemStore.setting.showComment,
  commentLength: 0 as $['commentLength'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
