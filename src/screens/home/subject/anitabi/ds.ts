/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:42:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-12 08:38:38
 */
import { _, systemStore } from '@stores'
import { SubjectId } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showAnitabi: true as typeof systemStore.setting.showAnitabi,
  subjectId: 0 as SubjectId,
  data: {} as $['state']['anitabi'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}

export const THUMB_WIDTH = _.r(160)

export const THUMB_HEIGHT = THUMB_WIDTH * 0.56
