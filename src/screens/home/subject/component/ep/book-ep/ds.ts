/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:06:20
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { StoreType as $ } from '../../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

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
  onChangeText: (() => {}) as $['changeText'],
  onScrollIntoViewIfNeeded: (() => {}) as (y: number) => any,
  doUpdateBookEp: (() => {}) as $['doUpdateBookEp'],
  doUpdateNext: (() => undefined) as $['doUpdateNext']
}
