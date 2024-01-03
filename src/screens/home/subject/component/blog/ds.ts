/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:02:06
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { Navigation } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Blog')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  showBlog: true as typeof systemStore.setting.showBlog,
  subjectId: 0 as $['subjectId'],
  blog: [] as $['subject']['blog'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
