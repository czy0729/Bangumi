/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:42:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:43:59
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { Navigation } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Topic')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as $['subjectId'],
  showTopic: true as typeof systemStore.setting.showTopic,
  topic: [] as $['subject']['topic'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
