/*
 * @Author: czy0729
 * @Date: 2022-08-25 19:14:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 19:16:34
 */
import { Navigation, ViewStyle } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const EVENT = {
  id: '人物.跳转',
  data: {
    from: '最近参与'
  }
} as const

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as ViewStyle,
  works: [] as $['works']
}
