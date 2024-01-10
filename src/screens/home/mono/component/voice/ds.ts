/*
 * @Author: czy0729
 * @Date: 2022-08-25 17:31:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:28:16
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { Navigation, ViewStyle } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Voice')

export const COMPONENT_MAIN = rc(COMPONENT)

export const EVENT = {
  id: '人物.跳转',
  data: {
    from: '最近演出角色'
  }
} as const

export const IMAGE_WIDTH = _.r(40)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as ViewStyle,
  voices: [] as $['voices']
}
