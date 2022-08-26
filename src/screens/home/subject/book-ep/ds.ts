/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:06:12
 */
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  chap: '' as $['state']['chap'],
  vol: '' as $['state']['vol'],
  book: {} as $['subjectFormHTML']['book'],
  comicLength: 0 as number,
  status: {
    name: '未收藏'
  } as $['collection']['status'],
  onChangeText: (() => {}) as $['changeText'],
  doUpdateBookEp: (() => {}) as $['doUpdateBookEp'],
  doUpdateNext: (() => undefined) as $['doUpdateNext']
}
