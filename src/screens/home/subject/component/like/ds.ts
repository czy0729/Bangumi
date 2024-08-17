/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 05:01:42
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { Navigation } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Like')

export const COMPONENT_MAIN = rc(COMPONENT)

export const COVER_WIDTH = 80

export const COVER_HEIGHT = COVER_WIDTH * 1.4

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  showLike: true as typeof systemStore.setting.showLike,
  subjectId: 0 as $['subjectId'],
  like: [] as $['like'],
  typeCn: '' as $['type'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
