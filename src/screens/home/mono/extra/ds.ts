/*
 * @Author: czy0729
 * @Date: 2022-08-25 19:22:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 19:25:20
 */
import { Navigation } from '@types'
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  monoId: '' as $['monoId'],
  canICO: false as $['canICO'],
  icoUsers: undefined as $['chara']['users'],
  doICO: (() => undefined) as $['doICO']
}
