/*
 * @Author: czy0729
 * @Date: 2022-10-28 21:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 16:55:35
 */
import { INIT_CHARACTERS_ITEM } from './init'

export type ListKey =
  | 'mvc'
  | 'mrc'
  | 'mfc'
  | 'mvi'
  | 'mpi'
  | 'rai'
  | 'mri'
  | 'recent'
  | 'tnbc'
  | 'nbc'
  | 'msrc'
  | 'bid'
  | 'asks'
  | 'auction'

export type Characters = typeof INIT_CHARACTERS_ITEM & {
  assets?: number
  state?: number
}
