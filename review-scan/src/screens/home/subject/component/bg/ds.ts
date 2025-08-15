/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 22:43:55
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Bg')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  style: {} as ReturnType<typeof memoStyles>['bg'],
  src: '' as string,
  cdn: true as boolean,
  height: 160 as number
}
