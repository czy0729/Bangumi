/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:33:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 17:13:10
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as $['subjectId'],
  disc: [] as $['disc'],
  discTranslateResult: [] as $['state']['discTranslateResult'],
  focusOrigin: false as typeof systemStore.setting.focusOrigin
}
