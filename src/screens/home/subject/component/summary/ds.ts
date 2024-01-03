/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:32:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:13:31
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Summary')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showSummary: true as typeof systemStore.setting.showSummary,
  translateResult: [] as $['state']['translateResult'],
  content: '' as $['summary'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
