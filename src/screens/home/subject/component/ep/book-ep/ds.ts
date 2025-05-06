/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:59:03
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'BookEp')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  chap: '0' as $['state']['chap'],
  vol: '0' as $['state']['vol'],
  book: {} as $['subjectFormHTML']['book'],
  comicLength: 0 as number,
  status: {
    name: '未收藏'
  } as $['collection']['status'],
  focusOrigin: false as typeof systemStore.setting.focusOrigin,
  onChangeText: FROZEN_FN as $['changeText'],
  onScrollIntoViewIfNeeded: FROZEN_FN as (y: number) => any,
  doUpdateBookEp: FROZEN_FN as $['doUpdateBookEp'],
  doUpdateNext: (() => undefined) as $['doUpdateNext']
}
