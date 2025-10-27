/*
 * @Author: czy0729
 * @Date: 2022-06-13 18:02:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-24 14:58:43
 */
import { Navigation, ReactNode } from '@types'

export type Props = {
  navigation: Navigation

  /** 左侧 Element */
  left?: ReactNode

  /** 右侧 Element */
  right?: ReactNode

  /** 长按 Logo 跳转的页面 */
  path?: 'Setting' | 'RakuenSetting'
}
