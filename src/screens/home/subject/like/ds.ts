/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:42:12
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'

export const COVER_WIDTH = 80

export const COVER_HEIGHT = COVER_WIDTH * 1.4

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  showLike: true as typeof systemStore.setting.showLike,
  subjectId: 0 as $['subjectId'],
  like: [] as $['like'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
