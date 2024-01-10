/*
 * @Author: czy0729
 * @Date: 2022-08-25 07:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 23:13:02
 */
import { rc } from '@utils/dev'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'HeaderTitle')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  tinygrail: false as $['tinygrail'],
  cover: '' as string,
  nameTop: '' as $['nameTop'],
  nameBottom: '' as $['nameBottom']
}
