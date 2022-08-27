/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:30:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 00:34:24
 */
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  data: [] as ReturnType<$['filterData']>,
  subjects: {} as ReturnType<$['subjects']>
}
