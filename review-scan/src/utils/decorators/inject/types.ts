/*
 * @Author: czy0729
 * @Date: 2024-05-01 14:21:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-05-01 14:21:22
 */
import { Fn, Navigation } from '@types'

export type Config = {
  /** 页面 store 是否缓存 */
  cache?: boolean

  /** 页面是否监听聚焦 */
  listenIsFocused?: boolean
}

export type WrapComponentProps = {
  /** 页面是否在最顶 */
  isFocused?: boolean
}

export type Props = {
  navigation: Navigation

  route?: {
    params?: any
    name?: any
  }

  /** Storybook */
  onMounted?: Fn
}
